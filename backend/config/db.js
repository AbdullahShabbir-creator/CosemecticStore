// import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Ensure .env file is loaded

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection failed:', err));
