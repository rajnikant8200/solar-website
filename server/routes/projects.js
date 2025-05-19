const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  date: { type: Date, required: true },
  kw: { type: Number, required: true },
  contact: { type: String, required: true }, 
  status: { type: String, required: true }
});

// Project Model
const Project = mongoose.model('Project', projectSchema);

// GET /api/projects - Fetch all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    console.error(' Error fetching projects:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/projects - Add a new project
router.post('/', async (req, res) => {
  const { name, type, date, kw, contact, status } = req.body;

  if (!name || !type || !date || !kw || !contact || !status) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newProject = new Project({ name, type, date, kw, contact, status });
    await newProject.save();
    res.status(201).json({ message: ' Project added successfully' });
  } catch (err) {
    console.error(' Error saving project:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/projects/:id - Update project
router.put('/:id', async (req, res) => {
  const { name, type, date, kw, contact, status } = req.body;

  if (!name || !type || !date || !kw || !contact || !status) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { name, type, date, kw, contact, status },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ message: ' Project updated successfully', project: updatedProject });
  } catch (err) {
    console.error(' Error updating project:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/projects/:id - Delete a project
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json({ message: ' Project deleted successfully' });
  } catch (error) {
    console.error(' Error deleting project:', error);
    res.status(500).json({ message: 'Error deleting project', error });
  }
});

module.exports = router;
