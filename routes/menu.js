const express = require("express");
const menuRouter = express.Router();
const Menu = require("../models/menu");
const cloudinary = require("../utils/cloudinary")





menuRouter.post("/menu/post", async(req, res) => {
  const { name, price,  img,categories, description, adminId  } = req.body;

    try {

        const result = await cloudinary.uploader.upload(img, {
                  folder: "hotel mysore dosa",
           })
        
        let menu = new Menu({
            name, price,  img: result.url, categories, description , adminId
        });

        try {
            await menu.save();
        } catch (error) {
            return res.status(409).json({message: "menu post error"});
        }

        return res.status(201).json({message:"menu post sucessfully"});

    } catch (error) {
        return res.status(400).json({message: "api menu post error"});
    }
  });

  menuRouter.get("/menu/get", async(req, res) => {


    let menu;

    try {
      menu = await Menu.find();
    } catch (error) {
      return res.status(400).json({ message:"Menu Get Error" })
    }

    return res.status(201).json({ message:"Menu Get Successfully", menu })

  });


  menuRouter.get("/menu/get/:id", async(req, res) => {

    let id = req.params.id;

    let menu;
    try {
      menu = await Menu.findById(id);
    } catch (error) {
      return res.status(400).json({ message:"Menu Get Error" })
    }

    return res.status(201).json({ message:"Menu Get Successfully", menu })
  });


  menuRouter.put("/menu/update/:id", async(req, res) => {

    const { name, price,  img,categories, description, adminId  } = req.body;


    const result = await cloudinary.uploader.upload(img, {
      folder: "hotel mysore dosa",
       })

    let id = req.params.id;

    let menu;
    try {
      menu = await Menu.findByIdAndUpdate(id, { name, price, img: result.url,  categories, description, adminId });
    } catch (error) {
      return res.status(400).json({ message:"Menu Get Error" })
    }

    return res.status(201).json({ message:"Menu updated Successfully", menu })
  });


  menuRouter.delete("/menu/delete/:id", async(req, res) => {

 
    let id = req.params.id;

    let menu;
    try {
      menu = await Menu.findByIdAndDelete(id);
    } catch (error) {
      return res.status(400).json({ message:"Menu Get Error" })
    }

    return res.status(201).json({ message:"Menu Deleted Successfully", menu })
  });

  



module.exports = menuRouter;