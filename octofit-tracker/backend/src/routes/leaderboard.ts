import { Router } from 'express';
import LeaderboardModel from '../models/leaderboard';

const router = Router();

router.get('/', async (_req, res) => {
  const leaderboard = await LeaderboardModel.find().sort({ rank: 1 });
  res.json({ leaderboard });
});

router.post('/', async (req, res) => {
  const { rank, userId, name, score } = req.body as {
    rank?: number;
    userId?: string;
    name?: string;
    score?: number;
  };

  if (typeof rank !== 'number' || !userId || !name || typeof score !== 'number') {
    return res.status(400).json({ error: 'rank, userId, name, and score are required' });
  }

  const entry = new LeaderboardModel({ rank, userId, name, score });
  await entry.save();
  res.status(201).json(entry);
});

export default router;
