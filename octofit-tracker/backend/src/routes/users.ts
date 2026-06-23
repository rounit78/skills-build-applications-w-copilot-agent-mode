import { Router } from 'express';
import UserModel from '../models/user';

const router = Router();

router.get('/', async (_req, res) => {
  const users = await UserModel.find().sort({ createdAt: 1 });
  res.json({ users });
});

router.post('/', async (req, res) => {
  const { name, email, role } = req.body as { name?: string; email?: string; role?: string };
  if (!name || !email || !role) {
    return res.status(400).json({ error: 'name, email, and role are required' });
  }

  const user = new UserModel({ name, email, role });
  await user.save();
  res.status(201).json(user);
});

export default router;
