import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async ({ to, subject, html }) => {
  try {
    await transporter.sendMail({
      from: `"Email Campaign Scheduler" <${process.env.SMTP_USER}>`,
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
