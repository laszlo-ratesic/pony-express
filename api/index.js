const app = require('express')();
const nodemailer = require("nodemailer");
const multiparty = require("multiparty");
require("dotenv").config();

// Create transport object
const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

// Verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

// POST route
app.get("/api/send", (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  // accept formdata and parse w/ multiparty
  let form = new multiparty.Form();
  let data = {};
  form.parse(req, function (err, fields) {
    console.log(fields);
    Object.keys(fields).forEach(function (property) {
      data[property] = fields[property].toString();
    });

    console.log(`<${data.email}>`);
    // Create mail object w/ fields
    const mail = {
      from: `"P.T.H. Website Admin" <${process.env.EMAIL}>`,
      to: `${process.env.EMAIL}, info@postcardsthroughhell.com`,
      subject: "[contact-message]: Postcards Through Hell",
      html: `From: ${data.name} | ${data.company}<br/>
          Referred by: ${data.referral}<br/>
          <${data.email}><br/>
          ${data.message}<br/>
          <br/>
          <a href="mailto:${data.email}">Reply to ${data.name}'s email - ${data.email}</a>`,
    };

// Use transporter to send mail
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
      } else {
        res.status(200).send("Email successfully sent to recipient!");
      }
    });
  });
});

module.exports = app;