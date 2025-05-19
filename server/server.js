const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const dotenv = require('dotenv');

const projectRoutes = require('./routes/projects');
const userRoutes = require('./routes/userRoutes');
const tasksRouter = require('./routes/Tasks');

dotenv.config(); 

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('uploads')); 


const mongoURI = 'mongodb+srv://rajnikanthirpara8200:meetrajni@cluster1.jlxmhzu.mongodb.net/solar-db?retryWrites=true&w=majority&appName=Cluster1';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log(' Connected to MongoDB Atlas'))
  .catch((err) => console.error(' MongoDB connection error:', err));


const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  profilePicture: String,
});

const User = mongoose.model('User', userSchema);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/profile-pictures');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.use('/api/projects', projectRoutes);
app.use('/api/user', userRoutes);
app.use('/api/tasks', tasksRouter);

// Base test route
app.get('/', (req, res) => {
  res.send(' API is running...');
});

// Register Route
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  console.log('📥 Register Received:', req.body);

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.json({ message: ' User registered successfully' });
  } catch (err) {
    console.error(' Error saving user:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('📥 Login Attempt:', req.body);

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    res.json({ success: true, message: 'Login successful' });
  } catch (err) {
    console.error(' Login error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Update User Settings Route
app.put('/user/settings', upload.single('profilePicture'), async (req, res) => {
  const { userId, username, email, password, newPassword } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (username) user.username = username;
    if (email) user.email = email;

    if (password && newPassword) {
      if (password !== user.password) {
        return res.status(400).json({ message: 'Current password is incorrect' });
      }
      user.password = newPassword;
    }

    if (req.file) {
      user.profilePicture = req.file.path;
    }

    await user.save();
    res.json({ message: 'Settings updated successfully' });
  } catch (err) {
    console.error(' Error updating settings:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});
