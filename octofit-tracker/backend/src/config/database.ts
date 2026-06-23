import mongoose from 'mongoose';

export const DB_NAME = process.env.DB_NAME || 'octofit_db';
export const MONGODB_URI = process.env.MONGODB_URI || `mongodb://127.0.0.1:27017/${DB_NAME}`;

export async function connectDatabase(): Promise<void> {
  await mongoose.connect(MONGODB_URI);
}
