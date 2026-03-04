const mongoose = require("mongoose");

const targetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  month: {
    type: String,
    required: true,
  },

  targetIncome: {
    type: Number,
    default: 0,
  },

  targetExpense: {
    type: Number,
    default: 0,
  },

}, { timestamps: true });

module.exports = mongoose.model("Target", targetSchema);
