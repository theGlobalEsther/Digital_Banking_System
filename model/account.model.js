const mongoose = require("mongoose");
const bankAccountSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  accountNumber: {
    type: String,
    required: true,
    unique: true,
  },
  accountName: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    default: 15000,
  },
  bankCode: {
    type: String,
    required: true,
  },
  fintechId: {
    type: String,
    required: true,

  },
},
{
  timestamps: true
}
);

const Account = mongoose.model("Account", bankAccountSchema);

module.exports = Account;
