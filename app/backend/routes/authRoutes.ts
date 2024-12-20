import express, { Request, Response } from 'express';
import { createUser, loginUser } from '../controllers/userController'; // Import controller functions

const router = express.Router();

// Route for user sign-up (creating a new user)
router.post('/signup', async (req: Request, res: Response) => {
  await createUser(req, res);  // Handle sign-up
});

// Login route
router.post('/login', async (req: Request, res: Response) => {
  await loginUser(req, res);  // Handle login
});

export default router;
