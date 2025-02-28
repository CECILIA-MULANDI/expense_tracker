const express = require("express");
const auth = require("../../middleware/auth");
const addIncome = require("./controllers/addIncome");
const addExpense = require("./controllers/addExpense");
const getTransactions = require("./controllers/getTransaction");
const deleteTransaction = require("./controllers/deleteTransactions");
const editTransactions = require("./controllers/editTransaction");
const transactionsRoutes = express.Router();

transactionsRoutes.use(auth);

transactionsRoutes.post("/addIncome", addIncome);
transactionsRoutes.post("/addExpense", addExpense);
transactionsRoutes.get("/", getTransactions);
transactionsRoutes.delete("/:transaction_id", deleteTransaction);
transactionsRoutes.patch("/", editTransactions);
module.exports = transactionsRoutes;
