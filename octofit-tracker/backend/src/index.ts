import express from 'express';
import { connectDatabase } from './config/database';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';

const app = express();
const PORT = Number(process.env.PORT || 8000);
const HOST = process.env.CODESPACE_NAME ? '0.0.0.0' : 'localhost';
const CODESPACE_NAME = process.env.CODESPACE_NAME;

app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.get('/', (_req, res) => {
  res.json({ message: 'OctoFit Tracker backend is running.' });
});

if (CODESPACE_NAME) {
  app.get('/api-url', (_req, res) => {
    const previewUrl = `https://${PORT}-${CODESPACE_NAME}.githubpreview.dev`;
    res.json({ apiUrl: previewUrl, source: 'codespaces' });
  });
}

async function start() {
  try {
    await connectDatabase();
    console.log('Connected to MongoDB');

    app.listen(PORT, HOST, () => {
      const address = CODESPACE_NAME
        ? `https://${PORT}-${CODESPACE_NAME}.githubpreview.dev`
        : `http://${HOST}:${PORT}`;
      console.log(`Backend server listening on ${address}`);
    });
  } catch (error) {
    console.error('Failed to start backend', error);
    process.exit(1);
  }
}

start();
