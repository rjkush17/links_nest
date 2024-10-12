import mongoose, { Document, Model } from "mongoose";
interface IuserOtpSchema extends Document{
    otp: string,
    email: string,
    userModel: object,
    generatedTime: number
}

const userOtpSchema = new mongoose.Schema({
    otp: {
      type: String,
      required: true
    },
    email:{
      type: String,
      required: true
    },
    userModel: {
      type: Object,
      required: true
    },
    generatedTime: {
      type: Number,
      required: true,
      expires: 300
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 1500,
    },
  });

  const UserOTP = Model<IuserOtpSchema> = mongoose.models.UserOTP || mongoose.model<IuserOtpSchema>("UserOTP", userOtpSchema)

  export default UserOTP;
