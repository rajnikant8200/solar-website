const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  due: {
    type: String,  // You can change this to Date if you prefer
    required: true,
  },
  customer: {
    type: String,
    required: false, // Optional
  },
  assignee: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
