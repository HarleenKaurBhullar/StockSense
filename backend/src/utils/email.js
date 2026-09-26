const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOTPEmail = async (email, otp) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'StockSense Password Reset OTP',
    text: `Your StockSense password reset OTP is ${otp}. It is valid for 10 minutes.`,
    html: `
      <h2>StockSense Password Reset</h2>

      <p>Your password reset OTP is:</p>

      <h1>${otp}</h1>

      <p>This OTP will expire in 10 minutes.</p>

      <p>If you did not request a password reset, you can ignore this email.</p>
    `,
  });
};

module.exports = {
  sendOTPEmail,
};