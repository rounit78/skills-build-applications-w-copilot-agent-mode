import mongoose from 'mongoose';

export interface TeamDocument extends mongoose.Document {
  name: string;
  members: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const teamSchema = new mongoose.Schema<TeamDocument>(
  {
    name: { type: String, required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }]
  },
  { timestamps: true }
);

const TeamModel = mongoose.models.Team || mongoose.model<TeamDocument>('Team', teamSchema);
export default TeamModel;
