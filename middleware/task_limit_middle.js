const Task = require("../models/model.task.js");

const enforceTaskLimit = async (req, res, next) => {
  try {
    const taskCount = await Task.countDocuments({ createdBy: req.user._id });

    if (taskCount >= 10) {
      return res.status(403).json({
        message: "Task limit reached. You can only create up to 10 tasks.",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Error checking task limit", error });
  }
};

module.exports = { enforceTaskLimit };
