import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import gadgetRoutes from './routes/gadgetRoutes';
import { seedData } from './utils/seed';

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/gadgets', gadgetRoutes);

app.get('/', (req, res) => {
  res.json({ success: true, message: 'GadgetVerse API is running 🚀' });
});

const PORT = process.env.PORT || 5000;

const start = async () => {
  await connectDB();
  await seedData();
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
};

start();