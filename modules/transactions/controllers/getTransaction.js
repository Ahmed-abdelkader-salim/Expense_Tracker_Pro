const mongoose = require("mongoose");

const getTransaction = async(req, res) => {
    const transactionModel = mongoose.model("transactions");
    const transactions = await transactionModel.find({
        user_id:req.user._id
    }) 
    res.status(200).json({
        status:"Transactions",
        data:transactions
    });
}


module.exports = getTransaction;