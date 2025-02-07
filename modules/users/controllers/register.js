const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwtManagers = require('../../../managers/jwtManagers');
const emailManager = require("../../../managers/emailManager")

const register = async (req, res) =>{

    const usersModel = mongoose.model('users');

    const {email, password, confirm_password, name, balance} = req.body;

    const getDuplicatedEmail = await usersModel.findOne({ email: email });

    if(getDuplicatedEmail) throw "This Email already exists";

    // validation
    if(!name) throw "Name is required"
    if(!email) throw "Email is required";
    if(!password) throw "Password is required";
    if(password.length < 5) throw "Password must be at least 5 characters";
    if(password !== confirm_password) throw "Password not match"

    // hash password

    const hashedPassword = await bcrypt.hash(password, 12)


    const createUser = await usersModel.create({
        name: name,
        email: email,
        password: hashedPassword,
        balance:balance
    });


    const accessToken = jwtManagers(createUser);
    

    await emailManager(createUser.email,"Welcome to exepense tracker pro. we hope you can manage your expenses easily from our platform","<h1>Welcome to Expense Tracker Pro</h1>","Welcome to Expense Tracker Pro" )




    res.status(201).json({
        status:'user registered successfully',
        accessToken:accessToken,
    });
}

module.exports = register;