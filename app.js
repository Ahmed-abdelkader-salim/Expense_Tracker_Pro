require("express-async-errors");
const express = require('express');
const app = express();
const cors = require("cors")

const errorHandler = require("./handlers/errorHandler");
app.use(express.json());
require("dotenv").config();
const mongoose = require("mongoose");
const userRoutes = require("./modules/users/users.routes");
const transactionsRoutes = require("./modules/transactions/transactions.routes");

app.use(cors());

// initalize model
require('./models/users.model');
require('./models/transactions.model');


// Routes
app.use('/api/users', userRoutes)
app.use('/api/transactions', transactionsRoutes)



app.all("*" , (req, res, next) => {
    res.status(404).json({
        status:"failed",
        message:"Not Found"
    })
});

app.use(errorHandler);

// Database Connection 

const connectToDb = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Database connected: ${connection.connection.host}`);
    } catch (error) {
    

        process.exit(1);  //Exit the process if the connection fails
    }
}

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    await connectToDb();
    app.listen(PORT, () => {
        console.log(`listening on http://localhost:${PORT}`)
    })

}

startServer();
