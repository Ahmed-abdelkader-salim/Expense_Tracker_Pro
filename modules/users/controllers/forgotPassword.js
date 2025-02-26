const mongoose = require("mongoose");
const emailManager = require("../../../managers/emailManager")
const forgotPassword = async(req, res) => {

    const userModel = mongoose.model("users");

    const {email} = req.body;

    if(!email) throw "Email is required";


    const getUser = await userModel.findOne({
        email:email
    });

    if(!getUser) throw "This email doesnot exist in the system";

    const resetCode = Math.floor(10000 + Math.random() * 90000);

    await userModel.updateOne(
        {email:email},
        {reset_code:resetCode},
        {runValidators:true},

    );

    await emailManager(email, "Your password reset code is " + resetCode , "<h1>Welcome to Expense Tracker Pro</h1>","Reset your password - Expense Tracker Pro")


    res.status(200).json({
        status:"reset code sent to email successfully",

    });


}


module.exports = forgotPassword;