const nodemailer = require("nodemailer");
const htmlToText = require("html-to-text");
const pug = require("pug");
module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = "Anoop singh <ajbsiht99@gmail.com>";
  }

  newTransport() {
    return nodemailer.createTransport({
      service: "Gmail",
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      // secure: false,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html),
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send("welcome", `Welcome to bookCabin family ${this.firstname}`);
  }

  async sendPasswordReset() {
    await this.send(
      "passwordReset",
      "your password reset token valid for 10 min only"
    );
  }
};
