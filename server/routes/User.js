const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,  // Store the path to the profile picture
    default: '',   // Default is empty string if no profile picture is uploaded
  },
  theme: {
    type: String,
    enum: ['light', 'dark'],  // Options for theme (light or dark)
    default: 'light',         // Default to light theme
  },
  language: {
    type: String,
    enum: ['English', 'Spanish', 'French'],  // You can add more languages if needed
    default: 'English',          // Default to English
  },
  twoStepVerification: {
    type: Boolean,
    default: false,  // Default is disabled for two-step verification
  },
});

module.exports = mongoose.model('User', userSchema);
