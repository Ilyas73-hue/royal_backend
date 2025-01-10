const  mongoose = require("mongoose");


const menuSchema = new mongoose.Schema({
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
    }
});


const menu = new mongoose.model("menu", menuSchema);

module.exports = menu;
