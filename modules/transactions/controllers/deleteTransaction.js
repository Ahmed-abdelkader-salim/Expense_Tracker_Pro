const mongoose = require("mongoose");

const deleteTransaction = async(req, res) => {

    const transactionModel = mongoose.model("transactions");
    const usersModel = mongoose.model("users");

    const {transaction_id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(transaction_id)) throw "please provide a valid id!"

    const getTransaction = await transactionModel.findOne({
        _id:transaction_id
    });

    if(!getTransaction) throw "Transaction not found!";

    if(getTransaction.transaction_type === "income"){
        // income logic here

        await usersModel.updateOne(
        {
            _id:getTransaction.user_id
        },
        {
            $inc:{
                balance:getTransaction.amount * -1
            }
        },
        {
            runValidators:true,
        }
        );

    }else{
        // expense logic here

        await usersModel.updateOne(
            {
                _id:getTransaction.user_id
            },
            {
                $inc:{
                    balance:getTransaction.amount
                }
            },
            {
                runValidators:true,
            }
            );
    }

    await transactionModel.deleteOne({
        _id:transaction_id
    });


    res.status(200).json({
        status:"Deleted successfully!"
    })


}


module.exports = deleteTransaction;