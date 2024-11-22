const crypto = require("crypto");
const bcrypt = require("bcrypt");
const ResetToken = require("../models/model.reset.token.js");
const User = require("../models/model.user.js");
const { sendEmail } = require("../utils/emailService.js");

const resetPasswordInit = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate reset token
    const token = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // Save token in database
    await new ResetToken({
      userId: user._id,
      token: hashedToken,
    }).save();

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;
    await sendEmail(
      user.email,
      "Password Reset",
      `Reset your password: ${resetLink}`
    );

    res.status(200).json({ message: "Password reset link sent" });
  } catch (error) {
    console.error("Error initiating reset:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const resetPasswordComplete = async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res
      .status(400)
      .json({ message: "Token and new password are required" });
  }

  try {
    // Hash the token to match the stored token
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // Find the reset token in the database
    const resetToken = await ResetToken.findOne({ token: hashedToken });
    if (!resetToken)
      return res.status(400).json({ message: "Invalid or expired token" });

    // Find the associated user
    const user = await User.findById(resetToken.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Hash the new password and update it
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    // Delete the used reset token
    await ResetToken.deleteOne({ token: hashedToken });

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error completing reset:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { resetPasswordInit, resetPasswordComplete };
