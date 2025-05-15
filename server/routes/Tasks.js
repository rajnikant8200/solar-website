const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Task Schema
const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  due: { type: Date, required: true },
  customer: { type: String, required: true },
  assignee: { type: String, required: true },
  label: { type: String, required: true },
  status: { type: String, required: true },
});

// Task Model
const Task = mongoose.model('Task', taskSchema);

// GET all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    console.error('❌ Error fetching tasks:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST new task
router.post('/', async (req, res) => {
  const { name, due, customer, assignee, label, status } = req.body;
  if (!name || !due || !customer || !assignee || !label || !status) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newTask = new Task({ name, due, customer, assignee, label, status });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    console.error('❌ Error saving task:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT update task status (or whole task if you want)
router.put('/:id', async (req, res) => {
  const { status } = req.body;
  if (!status) {
    return res.status(400).json({ message: 'Status is required' });
  }

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(updatedTask);
  } catch (err) {
    console.error('❌ Error updating task:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
