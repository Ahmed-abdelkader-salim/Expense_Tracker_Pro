const mongoose = require("mongoose")
const validator = require("validator")


const addExpense = async(req, res) =>{

    const usersModel = await mongoose.model('users');
    const transactionsModel = await mongoose.model('transactions');

    const {amount, remarks} = req.body;

    if(!amount) throw "amount is required!";
    if(!remarks) throw "remarks is required";
    if(remarks.length < 5) throw "remarks must be at least 5 char";
    if(!validator.isNumeric(amount.toString())) throw "Amount must be a number";

    if(amount < 0) throw "Amount must not be negative";

    await transactionsModel.create({
        user_id:req.user._id,
        amount:amount,
        remarks:remarks,
        transaction_type:"expense",
    });

    await usersModel.updateOne(
    {
        _id:req.user._id,
    },
    {
        $inc:
        {
            balance:amount * -1,
        },
    },
    {
        runValidators:true,
    }
    )
    res.status(200).json({
        status:'success',
        message:'expense created successfully'
    })
}

module.exports = addExpense;