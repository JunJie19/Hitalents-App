const nodemailer = require('nodemailer');
const { createTransportConfig } = require('./mailerConfig');

const transporter = nodemailer.createTransport(createTransportConfig);

function mailSend(req, res) {
  const fname = req.body.fname
  const lname = req.body.lname
  const email = req.body.email
  const subject = req.body.subject
  const message = req.body.message

  const mail_body = "<b>First Name: </b>" + fname + "<br/>" +
    "<b>Last Name: </b>" + lname + "<br/>" +
    "<b>Email: </b>" + email + "<br/>" +
    "<b>Message: </b>" +
    "<p>" + message + "</p>"

  const mailOptions = {
    from: 'contact@hyde-china.com',
    to: 'contact@hyde-china.com',
    subject: subject,
    html: mail_body
  }

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      res.status(400).json({
        success: false,
        msg: "Something went wrong!"
      });
    } else {
      res.status(200).json({
        success: true,
        data: "Success!"
      })
    }
  })
}

module.exports = {
  mailSend
}