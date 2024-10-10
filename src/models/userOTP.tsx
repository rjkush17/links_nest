import mongoose, { Document, Model } from "mongoose";
import UserModel from "./userModel";

interface IuserOtpSchema extends Document{
    name: string,
    userID: string,
    userModel: mongoose.Schema.Types.ObjectId,
    generatedTime: Date
}

const userOtpSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: String,
      required: true,
    },
    otp: {
      type: Number,
      required: true
    },
    userModel: {
      type: UserModel,
      required: true,
    },
    generatedTime: {
      type: Date,
      default: Date.now,
      expires: 300
    }
  });

  const UserOTP = Model<IuserOtpSchema> = mongoose.models.UserOTP || mongoose.model<IuserOtpSchema>("UserOTP", userOtpSchema)

  export default UserOTP;
