const User = require("../models/model.user.js");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../utils/emailService");
require("dotenv").config();

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password });

    
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({ token }); 
  } catch (error) {
    console.error("Error registering user:", error); 
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token }); 
  } catch (error) {
    console.error("Error logging in:", error); 
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};


const resetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;

    await sendEmail(
      email,
      "Password Reset",
      `Click here to reset your password: ${resetLink}`
    );

    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    console.error("Error sending password reset email:", error);
    res.status(500).json({ message: "Error sending password reset email", error: error.message });
  }
};


module.exports = { register, login, resetPassword };
