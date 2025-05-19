const mongoose = require('mongoose');

// MongoDB connection string
const mongoURI = 'mongodb://localhost:27017/solarApp'; // Or use MongoDB Atlas connection string

const connectDB = async () => {
  try {
    // Only attempt connection if not already connected
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('MongoDB Connected...');
    } else {
      console.log('MongoDB already connected.');
    }
  } catch (err) {
    console.error(' MongoDB Connection Error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
