const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

//utils
const { catchAsync } = require("../utils/catchAsync.util");

dotenv.config();

const sendEmail = catchAsync(async (req, res) => {
  const { title, message, email } = req.body;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 587,
    // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER, // generated ethereal user
      pass: process.env.EMAIL_PASSWORD, // generated ethereal password
    },
  });

  const msg = {
    from: email, // sender address
    to: "jaredmejia4440@gmail.com", // list of receivers
    subject: title, // Subject line
    text: message, // plain text body
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(msg);

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  res.send("Email sent!");
});

module.exports = { sendEmail };
