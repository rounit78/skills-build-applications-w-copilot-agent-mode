import mongoose from 'mongoose';

export interface LeaderboardDocument extends mongoose.Document {
  rank: number;
  userId: mongoose.Types.ObjectId;
  name: string;
  score: number;
  createdAt: Date;
  updatedAt: Date;
}

const leaderboardSchema = new mongoose.Schema<LeaderboardDocument>(
  {
    rank: { type: Number, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    score: { type: Number, required: true }
  },
  { timestamps: true }
);

const LeaderboardModel = mongoose.models.Leaderboard || mongoose.model<LeaderboardDocument>('Leaderboard', leaderboardSchema);
export default LeaderboardModel;
