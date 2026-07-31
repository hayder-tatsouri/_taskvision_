const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

class EmailService {
  async sendEmail({ to, subject, text, html }) {
    try {
      await transporter.sendMail({
        from: `"Project Management System" <${process.env.GMAIL_USER}>`,
        to,
        subject,
        text,
        html,
      });

      console.log(` Email sent to ${to}`);
      return { success: true };
    } catch (error) {
      console.error(" Email error:", error);
      return { success: false, message: error.message };
    }
  }

  // Optional helper for project notifications
  async sendProjectNotification({ to, userName, projectName, message }) {
    const html = `<p>Hello ${userName},</p>
                  <p>Project: <strong>${projectName}</strong></p>
                  <p>${message}</p>`;
    return await this.sendEmail({
      to,
      subject: `Project Update: ${projectName}`,
      text: `Hello ${userName}, Project: ${projectName}, ${message}`,
      html,
    });
  }

  // Optional helper for deadline reminders
  async sendDeadlineReminder({ to, userName, projectName, deadline, daysLeft }) {
    const html = `<p>Hello ${userName},</p>
                  <p>Project: <strong>${projectName}</strong></p>
                  <p>Deadline: ${deadline} (${daysLeft} days left)</p>`;
    return await this.sendEmail({
      to,
      subject: `⚠️ Deadline Reminder: ${projectName} (${daysLeft} days left)`,
      text: `Hello ${userName}, your project "${projectName}" is due in ${daysLeft} days (${deadline})`,
      html,
    });
  }
}

module.exports = new EmailService();
