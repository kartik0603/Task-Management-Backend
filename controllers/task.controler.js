const Task = require("../models/model.task.js");

const getTasks = async (req, res) => {
  try {
    const { status, sortBy } = req.query;
    const query = { createdBy: req.user._id };

    if (status) query.status = status;

    const tasks = await Task.find(query).sort(
      sortBy === "dueDate" ? { dueDate: 1 } : {}
    );

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Failed to fetch tasks", error });
  }
};

const createTask = async (req, res) => {
  try {
    const task = new Task({ ...req.body, createdBy: req.user._id });
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Failed to create task", error });
  }
};

module.exports = { getTasks, createTask };
