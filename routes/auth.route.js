const express = require("express");
const {
  register,
  login,
  resetPassword,
} = require("../controllers/auth.controler.js");
const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/reset-password", resetPassword);

module.exports = authRouter;
