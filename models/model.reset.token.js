const mongoose = require("mongoose");
const crypto = require("crypto");

const resetTokenSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 3600 },
  });
  

module.exports = mongoose.model("ResetToken", resetTokenSchema);
