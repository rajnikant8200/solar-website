// userController.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');
const multer = require('multer');
const User = require('../models/User'); // User model

// Configure multer to store files in 'uploads/profile-pictures'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/profile-pictures');  // Save to 'uploads/profile-pictures' folder
  },
  filename: (req, file, cb) => {
    // Use Date.now to avoid file name conflicts
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Update user settings
const updateUserSettings = async (req, res) => {
  try {
    const userId = req.user.id;  // Get user ID from JWT (assuming token is provided in header)
    const user = await User.findById(userId);
    
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { username, email, theme, language, password, newPassword, twoStepVerification } = req.body;

    // Handle password change if requested
    if (password && newPassword) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

      user.password = await bcrypt.hash(newPassword, 10);  // Update password hash
    }

    // Update settings
    if (username) user.username = username;
    if (email) user.email = email;
    if (theme) user.theme = theme;
    if (language) user.language = language;
    if (twoStepVerification !== undefined) user.twoStepVerification = twoStepVerification;

    // Handle profile picture upload
    if (req.file) {
      user.profilePicture = req.file.path;  // Save the path to the new profile picture
    }

    await user.save();  // Save the updated user
    res.json({ message: 'Settings updated successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Define API route for updating settings
const router = require('express').Router();

// Middleware: Handle file upload for the profile picture
router.put('/settings', upload.single('profilePicture'), updateUserSettings);

module.exports = router;
