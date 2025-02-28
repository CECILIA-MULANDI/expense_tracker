const mongoose = require("mongoose");
const validator = require("validator");
const editTransactions = async (req, res) => {
  const transactionModel = mongoose.model("transactions");
  const { transaction_id, remarks, transaction_type, amount } = req.body;
  if (!transaction_id) throw "Transaction id is required!";
  if (!validator.isMongoId(transaction_id.toString()))
    throw "Please provide a valid id!";
  if (transaction_type !== "income" && transaction_type !== "expense")
    throw "Transaction type can only be either an income or an expense";
  const getTransaction = await transactionModel.findOne({
    _id: transaction_id,
  });
  if (!getTransaction) throw "Transaction not found!";
  await transactionModel.updateOne(
    {
      _id: transaction_id,
    },
    {
      remarks,
      transaction_type,
      amount,
    },
    {
      runValidators: true,
    }
  );
  res.status(200).json({
    status: "Sucess",
  });
};

module.exports = editTransactions;
