import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import authRoutes from './routes/authRoutes'; // Import authentication routes

const app = express();

// Middleware to parse incoming JSON requests
app.use(json());
app.use(cors()); // Allows cross-origin requests

// Use the authentication routes
app.use('/api/auth', authRoutes); // Prefix all auth routes with '/api/auth'

// A simple test route to check if the server is working
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});
