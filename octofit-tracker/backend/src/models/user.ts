import mongoose from 'mongoose';

export interface UserDocument extends mongoose.Document {
  name: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true }
  },
  { timestamps: true }
);

const UserModel = mongoose.models.User || mongoose.model<UserDocument>('User', userSchema);
export default UserModel;
