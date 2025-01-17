const express = require('express');

const addressRouter = express.Router();

const Address = require("../models/address");
const address = require('../models/address');



addressRouter.post("/address/post", async(req, res) => {
    const { door_no, street_name, city, state, country, pincode, adminId, userId } = req.body;




    let address;
    try {
       address = await new Address({
        door_no, street_name, city, state, country, pincode, adminId, userId
       })
       address.save()
    } catch (error) {
        return res.status(400).json({ message: "No Data Posted" })
    }

    return res.status(201).json({ message: "Address Post Successfully", address })

 });


 addressRouter.get(`/address/get`, async(req, res) => {

    let address;

    try {
        address = await Address.find();
    } catch (error) {
        return res.status(400).json({ message: "No Data Get" })
    }

    return res.status(201).json({ message: "Address Get Successfully", address })


 });

 addressRouter.put("/address/update/:id", async(req, res) => {
   

    const { door_no, street_name, city, state, country, pincode, adminId, userId } = req.body;

    const id = req.params.id;

    let address;
    try {
        address = await Address.findByIdAndUpdate( id, {
            door_no, street_name, city, state, country, pincode, adminId, userId 
        })
    } catch (error) {
        return res.status(400).json({ message: "No Data Update" })
    }

    return res.status(201).json({ message: "Address Update Successfully", address })

 });


 addressRouter.delete("/address/delete/:id", async(req, res) => {
    let id = req.params.id;

    let address;
    try {
        address = await Address.findByIdAndDelete(id);
    } catch (error) {
        return res.status(400).json({ message: "No Data Delete" }) 
    }

    return res.status(201).json({ message: "Address Delete Successfully", address })

 })




 module.exports = addressRouter;