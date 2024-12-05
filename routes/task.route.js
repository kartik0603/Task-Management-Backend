const express = require("express");
const taskRouter = express.Router();


const { enforceTaskLimit } = require("../middleware/task_limit_middle.js");
const { getTasks, createTask } = require("../controllers/task.controler.js");
const protect = require("../middleware/auth_middle.js");
const roleCheck = require("../middleware/roleCheck.middleware.js")


taskRouter.use(protect);


taskRouter.post("/craete", roleCheck(["Admin"]), enforceTaskLimit, createTask);
taskRouter.get("/get", roleCheck(["User", "Admin"]), getTasks);
module.exports = taskRouter;
