const jwt = require("jsonwebtoken");
const User = require("../models/model.user");
require("dotenv").config();


const protect = async (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  
  if (!token) {
    return res.status(401).json({ message: "Not Authorized" });
  }

  try {
   
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    
    req.user = await User.findById(decoded.id);

   
    if (!req.user) {
      return res.status(401).json({ message: "User Not Found" });
    }

    next(); 
  } catch (error) {
    return res.status(401).json({ message: "Not Authorized, Token Failed" });
  }
};

// Role-based access control middleware
const authorize = (...roles) => {
  return (req, res, next) => {
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access Denied" });
    }
    next();
  };
};

module.exports = { protect, authorize };
