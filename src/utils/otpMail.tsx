export const otpMail = (otp:string | number) =>{

  return(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OTP Verification</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      color: #333;
      padding: 20px;
    }
    .container {
      background-color: white;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      color: #4CAF50;
    }
    .otp {
      font-size: 24px;
      font-weight: bold;
      color: #4CAF50;
      text-align: center;
      margin: 20px 0;
    }
    .footer {
      font-size: 12px;
      color: #777;
      margin-top: 30px;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2 class="header">Your OTP Code</h2>
    <p>Dear User,</p>
    <p>Your OTP code for verifying your Email is:</p>
    <p class="otp">${otp}</p> <!-- Use {{OTP}} as a placeholder -->
    <p>Please use this code within the next 5 minutes to complete your verification process. For security reasons, do not share this code with anyone.</p>
    <p>If you didn't request this, please ignore this email.</p>
    <p>Thank you,</p>
    <p>LinksNest App Team</p>
    <div class="footer">
      <p>&copy; 2024 LinksNest. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`
)
} 