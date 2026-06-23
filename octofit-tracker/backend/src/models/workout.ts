import mongoose from 'mongoose';

export interface WorkoutDocument extends mongoose.Document {
  title: string;
  durationMinutes: number;
  intensity: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt: Date;
}

const workoutSchema = new mongoose.Schema<WorkoutDocument>(
  {
    title: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    intensity: { type: String, required: true, enum: ['low', 'medium', 'high'] }
  },
  { timestamps: true }
);

const WorkoutModel = mongoose.models.Workout || mongoose.model<WorkoutDocument>('Workout', workoutSchema);
export default WorkoutModel;
