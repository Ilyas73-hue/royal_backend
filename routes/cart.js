const express = require("express");
const cartRouter = express.Router();
const Cart = require("../models/cart");






cartRouter.post("/cart/post", async(req, res) => {
  const { name, price,  img,categories, description, adminId, userId  } = req.body;

    try {

        let cart = new Cart({
            name, price,  img , categories, description , adminId, userId
        });

        try {
            await cart.save();
        } catch (error) {
            return res.status(409).json({message: "cart post error"});
        }

        return res.status(201).json({message:"cart post sucessfully"});

    } catch (error) {
        return res.status(400).json({message: "api cart post error"});
    }
  });

  cartRouter.get("/cart/get", async(req, res) => {


    let cart;

    try {
      cart = await Cart.find();
    } catch (error) {
      return res.status(400).json({ message:"Cart Get Error" })
    }

    return res.status(201).json({ message:"Cart Get Successfully", cart })

  });


  cartRouter.get("/cart/get/:id", async(req, res) => {

    let id = req.params.id;

    let cart;
    try {
      cart = await Cart.findById(id);
    } catch (error) {
      return res.status(400).json({ message:"cart Get Error" })
    }

    return res.status(201).json({ message:"cart Get Successfully", cart })
  });


  cartRouter.put("/cart/update/:id", async(req, res) => {

    const { name, price,  img,categories, description, adminId , userId } = req.body;



    let id = req.params.id;

    let cart;
    try {
      cart = await Cart.findByIdAndUpdate(id, { name, price, img,  categories, description, adminId, userId });
    } catch (error) {
      return res.status(400).json({ message:"Cart Get Error" })
    }

    return res.status(201).json({ message:"Cart updated Successfully", cart })
  });


  cartRouter.delete("/cart/delete/:id", async(req, res) => {

 
    let id = req.params.id;

    let cart;
    try {
      cart = await Cart.findByIdAndDelete(id);
    } catch (error) {
      return res.status(400).json({ message:"Cart Get Error" })
    }

    return res.status(201).json({ message:"Cart Deleted Successfully", cart })
  });

  



module.exports = cartRouter;