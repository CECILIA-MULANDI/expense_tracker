const nodeMailer = require("nodemailer");
const emailManager = async (to, text, html, subject) => {
  // Looking to send emails in production? Check out our Email API/SMTP product!
  let transport = nodeMailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "05d8ecf250d85d",
      pass: "8e184fdb0c57b9",
    },
  });
  await transport.sendMail({
    to: to,
    from: "info@expensetracker.com",
    text: text,
    html: html,
    message: subject,
  });
};

module.exports = emailManager;
