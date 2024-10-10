import nodemailer from "nodemailer";
import { otpMail } from "@/utils/otpMail";

export const verifyMail = (
  receiverMail: string,
  subject: string,
  otp: string
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASS,
    },
  });

  const htmlContent = otpMail(otp);


  const mail = {
    from: `"LinksNest App" <${process.env.EMAIL_ID}>`,
    to: receiverMail,
    subject: subject,
    html: htmlContent,
  };

  transporter
    .sendMail(mail)
    .then((res) => console.log("email send successfully", res))
    .catch((e) => console.log("email send failed", e));
};
