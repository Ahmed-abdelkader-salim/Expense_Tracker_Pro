const express = require('express');
const transactionsRoutes = express.Router();

const auth = require("../../middlewares/auth");

const addIncome = require("./controllers/addIncome");
const addExpense = require('./controllers/addExpense');
const getTransaction = require('./controllers/getTransaction');
const deleteTransaction = require('./controllers/deleteTransaction');
const editTransaction = require('./controllers/editTransaction');

transactionsRoutes.use(auth)

// protected routes
transactionsRoutes.post('/addIncome', addIncome);
transactionsRoutes.post('/addExpense', addExpense);
transactionsRoutes.get('/', getTransaction);
transactionsRoutes.delete('/:transaction_id', deleteTransaction);
transactionsRoutes.patch('/', editTransaction);



module.exports = transactionsRoutes;