const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwtManagers = require('../../../managers/jwtManagers');
const login = async (req, res) => {

    const usersModel = await mongoose.model('users');

    const {email, password} = req.body;


    const getUser = await usersModel.findOne({
        email:email,
    });

    if(!getUser) throw "this email is not exist";

    const comparePassword = await bcrypt.compare(password, getUser.password);

    if(!comparePassword) throw "email or password is wrong";

    const accessToken = jwtManagers(getUser);

    res.status(200).json({
        status:"success",
        message:"User loggedin Successfully",
        accessToken: accessToken
    });
}

module.exports = login;