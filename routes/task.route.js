const express = require("express");
const { protect, authorize } = require("../middleware/auth_middle.js");
const { enforceTaskLimit } = require("../middleware/task_limit_middle.js");
const { getTasks, createTask } = require("../controllers/task.controler.js");


const taskRouter = express.Router();

taskRouter.get("/", protect, getTasks);
taskRouter.post("/", protect, authorize("user", "admin"), enforceTaskLimit, createTask);


module.exports = taskRouter;
