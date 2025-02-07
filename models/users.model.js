const mongoose = require("mongoose");


const userSchema = new mongoose.Schema(
    {
    name:{
        type:String,
        required:[true, 'full Name is required']
    },
    email:{
        type:String,
        required:[true, 'email is required'],
        unique:true,
    },
    password:{
        type:String,
        required:[true, 'password is required'],
    },

    balance:{
        type:Number,
        required:[true,'balance is required'],
        default:0
    },
    reset_code:{
        type:Number
    }

    },
    {
        timestamps:true,
    }
)


const userModel = mongoose.model('users', userSchema)

module.exports = userModel;