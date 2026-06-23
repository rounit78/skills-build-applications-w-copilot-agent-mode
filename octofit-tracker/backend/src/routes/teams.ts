import { Router } from 'express';
import TeamModel from '../models/team';

const router = Router();

router.get('/', async (_req, res) => {
  const teams = await TeamModel.find().populate('members', 'name email role');
  res.json({ teams });
});

router.post('/', async (req, res) => {
  const { name, members } = req.body as { name?: string; members?: string[] };
  if (!name || !Array.isArray(members) || members.length === 0) {
    return res.status(400).json({ error: 'name and members are required' });
  }

  const team = new TeamModel({ name, members });
  await team.save();
  res.status(201).json(team);
});

export default router;
