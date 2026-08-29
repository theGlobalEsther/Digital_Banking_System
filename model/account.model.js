const mongoose = require("mongoose");
const accountSchema = new mongoose.Schema({
  accountNumber: {
    type: String,
    required: true,
    unique: true,
  },
  accountName: {
    type: String,
    required: true,
  },
  accountBalance: {
    type: Number,
    required: true,
    default: 15000,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
});

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
