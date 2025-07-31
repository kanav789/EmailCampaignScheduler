import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const transporter = nodemailer.createTransport({
  service: "gmail",

  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for 587
  auth: {
    user: process.env.Email_User,
    pass: process.env.Email_Password,
  },
});

export const sendEmail = async ({ to, subject, html }) => {
  try {
    await transporter.sendMail({
      from: `"Email Campaign Scheduler" <${process.env.Email_User}>`,
      to,
      subject,
      html,
    });
    return true;
  } catch (err) {
    console.error("Error sending email:", err);
    return false;
  }
};
