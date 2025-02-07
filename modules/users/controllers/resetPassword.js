const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const emailManager = require("../../../managers/emailManager")
const resetPassword = async(req, res) => {
    const userModel = mongoose.model("users");

    const {email, new_password, reset_code} = req.body;

    if(!email) throw "email is required";
    if(!new_password) throw "new password is required";
    if(!reset_code) throw "reset code is required";
    if(new_password.length < 5) throw "Password must be at least characters long";

    const getUserWithResetCode = await userModel.findOne({
        email:email,
        reset_code:reset_code,
    });

    if(!getUserWithResetCode) throw "Reset Code does not match";

        const hashedPassword = await bcrypt.hash(new_password, 12)
    
    await userModel.updateOne(
        {email:email},
        {
            password:hashedPassword,
            reset_code:""
        },
        {runValidators:true}
    );



    await emailManager(email, "your password is reseted successfully","your password is reseted successfully if you have not done that please contact us!", "reset password")

    res.status(200).json({
        status:"success",
        message:"password reset successfully"
    })
}


module.exports = resetPassword;