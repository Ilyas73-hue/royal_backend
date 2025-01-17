const mongoose = require("mongoose");


const addressSchema = new mongoose.Schema({
    door_no:{
        type: String,
        required: true
    },
    street_name:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    pincode:{
        type: Number,
        required: true
    },
    adminId: {
        type: String, 
        required: true
    },
    userId:{
        type: String, 
        required: true
    }
});


const address = new mongoose.model("address", addressSchema);

module.exports = address;