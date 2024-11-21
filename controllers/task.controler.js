const Task = require('../models/model.task.js');

const getTasks = async (req, res) => {
  try {
    const { status, sortBy } = req.query;
    const query = status ? { status } : {};
    const tasks = await Task.find(query).sort(sortBy === 'dueDate' ? { dueDate: 1 } : {});
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tasks', error });
  }
};

const createTask = async (req, res) => {
  try {
    const task = new Task({ ...req.body, userId: req.user._id });
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create task', error });
  }
};

module.exports = { getTasks, createTask };
