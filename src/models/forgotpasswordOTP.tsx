import mongoose, { Document, Model } from "mongoose";

interface IforgotPasswordSchema extends Document{
    otp: string,
    email: string,
    generatedTime: number
}

const forgotPasswordSchema = new mongoose.Schema({
    otp: {
      type: String,
      required: true
    },
    email:{
      type: String,
      required: true
    },
    password:{
      type: String,
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
      expires: 310,
    },
  });

  const forgotPasswordOTP = Model<IforgotPasswordSchema> = mongoose.models.forgotPasswordOTP || mongoose.model<IforgotPasswordSchema>("forgotPasswordOTP", forgotPasswordSchema)

  export default forgotPasswordOTP;
