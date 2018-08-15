/* eslint-disable no-console */

const emailHTML = require('./emailTemplate');

module.exports = (app, nodemailer) => {
  const transporter = nodemailer.createTransport({
    host: 'mx1.hostinger.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  app.post('/api/send', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
      from: `"KSU Robotics" <${process.env.EMAIL_USER}>`, // sender address
      to: 'alexwendte@gmail.com', // list of receivers
      subject: 'Robotics Contact Form Submit', // Subject line
      text: '', // plain text body
      html: emailHTML(name, email, message),
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, error => {
      if (error) {
        res.status(500).json({ error: error.toString() });
        return console.log(error);
      }
      res.send('Thanks');
    });
  });
};
