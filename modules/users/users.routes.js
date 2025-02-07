const express = require("express");
const userRoutes = express.Router();

const register = require('./controllers/register');
const login = require('./controllers/login');
const dashboard = require('./controllers/userDashboard');
const auth = require("../../middlewares/auth");
const forgotPassword = require("./controllers/forgotPassword");
const resetPassword = require("./controllers/resetPassword");


//Routes 
userRoutes.post('/register', register);
userRoutes.post('/login', login);
userRoutes.post('/forgotpw', forgotPassword);
userRoutes.post('/resetpw', resetPassword);

userRoutes.use(auth)

// protected routes
userRoutes.get('/dashboard', dashboard)



module.exports = userRoutes;