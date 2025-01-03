const nodemailer = require("nodemailer");


  
module.exports = async(email, subject, text) => {
    try {
        const transporter =  nodemailer.createTransport({
            secure: process.env.SECURE,
            host: process.env.HOST,
            port: process.env.PORT_NODE,
            auth:{
                user: process.env.USER,
                pass: process.env.PASS
            }
        });

       console.log(email, subject, text)

        await transporter.sendMail({
            from: 'ilyasfullstackdeveloper@gmail.com',
            to: email,
            subject: subject,
            text: text,
        })
       
         console.log("email sent Sucessfully");
    } catch (error) {
        console.log("email not sent!");

      console.log(error);


      return error;
    }

};