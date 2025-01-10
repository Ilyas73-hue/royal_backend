const  mongoose = require("mongoose");


const cartSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    img:{
        type: String,
        required: true
    },
    categories:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    adminId:{
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: true
    }
});


const cart = new mongoose.model("cart", cartSchema);

module.exports = cart;
