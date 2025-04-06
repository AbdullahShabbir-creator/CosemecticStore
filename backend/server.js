import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Auth routes
app.use('/api/auth', authRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected successfully");
    // Start the server only after DB connection is successful
    app.listen(5000, () => console.log('Server started on port 5000'));
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
    process.exit(1); // Exit with failure
  });
