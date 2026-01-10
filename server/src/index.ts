import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import branchRoutes from './routes/branchRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import salesPersonRoutes from './routes/salePersonRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow the Flutter app to talk to us
app.use(express.json()); // Allow us to read JSON data

app.use('/branches', branchRoutes);
app.use('/services', serviceRoutes);
app.use('/salesperson', salesPersonRoutes);

// A Simple Test Route
app.get('/', (req, res) => {
  res.json({ message: 'Film Lab API is running! 🚀' });
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});