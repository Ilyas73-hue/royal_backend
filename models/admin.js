const  mongoose = require("mongoose");


const adminSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type:String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    }
}, {timestamps: true});


const admin = new mongoose.model("admin", adminSchema);

module.exports = admin;