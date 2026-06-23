import { Router } from 'express';
import WorkoutModel from '../models/workout';

const router = Router();

router.get('/', async (_req, res) => {
  const workouts = await WorkoutModel.find().sort({ durationMinutes: 1 });
  res.json({ workouts });
});

router.post('/', async (req, res) => {
  const { title, durationMinutes, intensity } = req.body as {
    title?: string;
    durationMinutes?: number;
    intensity?: 'low' | 'medium' | 'high';
  };

  if (!title || typeof durationMinutes !== 'number' || !intensity) {
    return res.status(400).json({ error: 'title, durationMinutes, and intensity are required' });
  }

  const workout = new WorkoutModel({ title, durationMinutes, intensity });
  await workout.save();
  res.status(201).json(workout);
});

export default router;
