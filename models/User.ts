import mongoose, { Schema, Document, models } from 'mongoose';

export interface IUser extends Document {
  fullName: string;
  username: string;
  email: string;
  password: string;
  resetToken?: string | null;
  resetTokenExpiry?: Date | null;
  createdAt?: Date;
}

const UserSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  username: { 
    type: String, 
    required: true, 
    unique: true,  
    trim: true,
    lowercase: true
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,  
    trim: true,
    lowercase: true
  },
  password: { type: String, required: true },
  resetToken: { type: String, default: null },
  resetTokenExpiry: { type: Date, default: null },
}, {
  timestamps: true  
});

const User = models.User || mongoose.model<IUser>('User', UserSchema);
export default User;
