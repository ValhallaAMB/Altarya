import mongoose, { Schema, Document } from 'mongoose';

// User schema interface
interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
}

// User schema definition
const userSchema: Schema<IUser> = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique : true
    },
    email: {
      type: String,
      required: true,
      unique : true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields automatically
);

// Create the User model
const User = mongoose.model<IUser>('User', userSchema);

export default User;
