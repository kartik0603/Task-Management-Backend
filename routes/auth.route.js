const express = require("express");
const {
  register,
  login,
  resetPassword,
} = require("../controllers/auth.controler.js");
const {
  resetPasswordInit,
  resetPasswordComplete,
} = require("../controllers/resetPassword.controler.js");
const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/reset-password", resetPassword);
authRouter.post("/reset-password/init", resetPasswordInit);
authRouter.post("/reset-password/complete", resetPasswordComplete);

module.exports = authRouter;
