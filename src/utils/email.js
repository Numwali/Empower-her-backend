import ejs from "ejs";
import path from "path";
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
dotenv.config();

class Email {
  constructor(user, url, verifcationCode) {
    this.to = user.email;
    this.firstname = user.firstname;
    this.email = user.email;
    this.from = process.env.EMAIL_FROM;
    this.resetUrl = url;
    this.verifcationCode = verifcationCode;
    this.frontendUrl = process.env.FRONTEND_URL 
  }

  // Send the actual email
  async send(template, subject, title) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    // 1) Render HTML based on a ejs template
    const html = await ejs.renderFile(
      path.join(__dirname, `./../views/email/${template}.ejs`),
      {
        firstname: this.firstname,
        business: this.business,
        email: this.email,
        resetUrl: this.resetUrl,
        verifcationCode: this.verifcationCode,
        frontendUrl: this.frontendUrl, // Pass frontend URL to template
      }
    );
    // 2) Define email options
    const mailOptions = {
      to: this.to, // Change to your recipient
      from: this.from, // Change to your verified sender
      subject,
      text: html,
      html,
    };
    // 3) Create a transport and send email
    sgMail
      .send(mailOptions)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async sendWelcome() {
    await this.send("welcome", "Welcome to Empower Her");
  }

  async sendPasswordReset() {
    await this.send(
      "ResetPassword",
      "Your password reset token (valid for only 10 minutes)"
    );
  }
}

export default Email;