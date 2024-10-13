import mongoose, { Schema, Document, Model } from "mongoose";

interface IUser extends Document {
  name: string;
  password?: string;
  email: string;
  userID: string;
  providerName?: string;
  providerID?: string;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 25,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 4,
    maxlength: 120,
  },
  userID: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 200
  },
  providerName: {
    type: String
  },
  providerID: {
    type: String
  }
},
{ timestamps: true }
);

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema) || mongoose.models.User

export default User;
