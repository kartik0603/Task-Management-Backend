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

const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, dueDate, status } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, description, dueDate, status },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Failed to update task", error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const deletedTask = await Task.findByIdAndRemove(taskId);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    } else {
      return res.status(200).json({ message: "Task deleted successfully" });
    }
  } catch {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Failed to delete task", error });
  }
};

module.exports = { getTasks, createTask, updateTask , deleteTask};
