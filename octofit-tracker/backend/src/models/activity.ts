import mongoose from 'mongoose';

export interface ActivityDocument extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  createdAt: Date;
  updatedAt: Date;
}

const activitySchema = new mongoose.Schema<ActivityDocument>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true }
  },
  { timestamps: true }
);

const ActivityModel = mongoose.models.Activity || mongoose.model<ActivityDocument>('Activity', activitySchema);
export default ActivityModel;
