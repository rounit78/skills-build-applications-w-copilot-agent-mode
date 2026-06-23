/**
 * Seed the octofit_db database with test data
 */
import { connectDatabase } from '../config/database';
import ActivityModel from '../models/activity';
import LeaderboardModel from '../models/leaderboard';
import TeamModel from '../models/team';
import UserModel from '../models/user';
import WorkoutModel from '../models/workout';

async function seed() {
  console.log('Seed the octofit_db database with test data');

  await connectDatabase();

  await Promise.all([
    UserModel.deleteMany({}),
    TeamModel.deleteMany({}),
    ActivityModel.deleteMany({}),
    LeaderboardModel.deleteMany({}),
    WorkoutModel.deleteMany({})
  ]);

  const users = await UserModel.create([
    { name: 'Avery Morgan', email: 'avery@octofit.com', role: 'member' },
    { name: 'Jordan Lee', email: 'jordan@octofit.com', role: 'coach' },
    { name: 'Morgan Park', email: 'morgan@octofit.com', role: 'member' }
  ]);

  const [avery, jordan, morgan] = users;

  const teams = await TeamModel.create([
    { name: 'Core Crushers', members: [avery._id, jordan._id] },
    { name: 'Sprint Squad', members: [morgan._id] }
  ]);

  const workouts = await WorkoutModel.create([
    { title: 'Full Body Circuit', durationMinutes: 30, intensity: 'high' },
    { title: 'Recovery Yoga', durationMinutes: 20, intensity: 'low' },
    { title: 'Strength Builder', durationMinutes: 40, intensity: 'medium' }
  ]);

  const activities = await ActivityModel.create([
    { userId: avery._id, type: 'Running', durationMinutes: 35, caloriesBurned: 420 },
    { userId: jordan._id, type: 'Cycling', durationMinutes: 45, caloriesBurned: 510 },
    { userId: morgan._id, type: 'Rowing', durationMinutes: 25, caloriesBurned: 300 }
  ]);

  const leaderboard = await LeaderboardModel.create([
    { rank: 1, userId: jordan._id, name: 'Jordan Lee', score: 1320 },
    { rank: 2, userId: avery._id, name: 'Avery Morgan', score: 1245 },
    { rank: 3, userId: morgan._id, name: 'Morgan Park', score: 1100 }
  ]);

  console.log('Inserted:');
  console.log(`  users=${users.length}`);
  console.log(`  teams=${teams.length}`);
  console.log(`  workouts=${workouts.length}`);
  console.log(`  activities=${activities.length}`);
  console.log(`  leaderboard entries=${leaderboard.length}`);

  process.exit(0);
}

seed().catch((error) => {
  console.error('Seeding failed', error);
  process.exit(1);
});
