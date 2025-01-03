const express = require("express");
const User = require("../models/user");
const userRouter = express.Router()
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const Token = require("../models/token");
const sendEmail = require("../routes/Nodemailer");

userRouter.post("/signup", async(req, res) => {
    const { username, email, password } = req.body;

    if(!username){
        return res.status(401).json({ message: "please enter username"});
    }

    if(!email){
        return res.status(401).json({ message: "please enter email"});
    }

    if(!password){
        return res.status(401).json({ message: "please enter password"});
    }


    let existing;
    try {
        existing = await User.findOne({ email: email })
    } catch (error) {
        return res.status(401).json({ message: "No Records Found" })
    }

    if(existing){
        return res.status(401).json({ message: "Already Register, Please Login" })
    }

    let salt = await bcrypt.genSalt(Number(process.env.SALT));

    let hassedPassword = await bcrypt.hashSync(password, salt);

    let user = new User({
        username, email, password: hassedPassword
    });

    try {
        await user.save();
    } catch (error) {
        return res.status(401).json({ message: "Signup Error" })
    }

    return res.status(201).json({ message: "Signup Successfully" })

});


userRouter.post("/signin", async(req, res) => {
    const { email, password } = req.body;

    if(!email){
        return res.status(401).json({ message: "please enter email"});
    }

    if(!password){
        return res.status(401).json({ message: "please enter password"});
    }


    let existing;
    try {
        existing = await User.findOne({ email: email })
    } catch (error) {
        return res.status(401).json({ message: "No Records Found" })
    }

    if(!existing){
        return res.status(401).json({ message: "Please Register, After Login" })
    }

    const comparePassword = await bcrypt.compareSync(password, existing.password);

    if(!comparePassword){
        return res.status(401).json({ message: "Password Does Not Match" });
    }

    const token = jwt.sign({ _id: this._id }, process.env.JWTKEY, {
        "expiresIn":"1h"
    })

    return res.status(201).json({ data: token, message:"Login Successfully", user: existing })

});


userRouter.post("/forgot-password", async(req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
   console.log(user._id)
        if(!user){
            return res.status(409).send({ message: "Email Does Not Exists" })
        }

        let token = await Token.findOne({ userId: user._id });
		if (!token) {
			token = await new Token({
				userId: user._id,
				token: crypto.randomBytes(32).toString("hex"),
			}).save();
		}

        console.log(token.token)

        const url = `"Hotel Mysore Dosa Password Reset Link:" : ${process.env.BASE_URL}reset-password/${user._id}/${token.token}`
        await sendEmail(user.email, "Password Reset", url)



        res
			.status(201)
			.send({ message: "Password reset link sent to your email account" });

    } catch (error) {
        return res.status(401).json({ message: "Error" })
    }
});

userRouter.get("/forgot-password/:id/:token", async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id });
		if (!user) return res.status(400).send({ message: "Invalid link" });

		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Invalid link" });

		res.status(200).send("Valid Url");
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

//  set new password
userRouter.post("/reset-password/:id/:token", async (req, res) => {
	try {
    

        const user = await User.findById(req.params.id);
        if (!user) return res.status(400).send("invalid link or expired");

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).send("Invalid link or expired");

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

        user.password = hashPassword;
        await user.save();
        // await token.delete();

        res.send("password reset sucessfully.");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
});


module.exports = userRouter;

