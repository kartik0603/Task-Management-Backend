const User = require("../models/model.user.js");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../utils/emailService");
require("dotenv").config();
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  // Basic validation
  if (!email || !password || !name) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Validate email format using a simple regex pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create the user with the hashed password
    const user = await User.create({
      name,
      email,
      password,
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send response with the token
    res.status(201).json({ token });
  } catch (error) {
    console.error("Error registering user:", error);
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log(`User with email ${email} not found.`);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // console.log("Stored password:", user.password);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log(`Incorrect password for user: ${email}`);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // If the password is valid, generate JWT token
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
    res
      .status(500)
      .json({
        message: "Error sending password reset email",
        error: error.message,
      });
  }
};

module.exports = { register, login, resetPassword };
