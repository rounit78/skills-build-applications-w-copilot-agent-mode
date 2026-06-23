import { Router } from 'express';
import ActivityModel from '../models/activity';

const router = Router();

router.get('/', async (_req, res) => {
  const activities = await ActivityModel.find().populate('userId', 'name email');
  res.json({ activities });
});

router.post('/', async (req, res) => {
  const { userId, type, durationMinutes, caloriesBurned } = req.body as {
    userId?: string;
    type?: string;
    durationMinutes?: number;
    caloriesBurned?: number;
  };

  if (!userId || !type || typeof durationMinutes !== 'number' || typeof caloriesBurned !== 'number') {
    return res.status(400).json({ error: 'userId, type, durationMinutes, and caloriesBurned are required' });
  }

  const activity = new ActivityModel({ userId, type, durationMinutes, caloriesBurned });
  await activity.save();
  res.status(201).json(activity);
});

export default router;
