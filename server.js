const express = require("express");
const htmlRoutes = require('./routes/htmlRoutes');
const nodemailer = require("nodemailer");
const multiparty = require("multiparty");
const { transformSync } = require("@babel/core");
require("dotenv").config();

// Testing port will be 5000
const PORT = process.env.PORT || 5000;

// Initialize express server
const app = express();
// cors
// app.use(cors({ origin: "*" }));

// Serve static files from public
app.use(express.static('public'))

app.use('/', htmlRoutes);

// Create transport object
const transporter = nodemailer.createTransport({
  host: "smtp.live.com",
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
app.post("/send", (req, res) => {
  // accept formdata and parse w/ multiparty
  let form = new multiparty.Form();
  let data = {};
  form.parse(req, function (err, fields) {
    console.log(fields);
    Object.keys(fields).forEach(function (property) {
      data[property] = fields[property].toString();
    });

    // Create mail object w/ fields
    const mail = {
      from: data.name,
      to: process.env.EMAIL,
      subject: data.subject,
      text: `${data.name} <${data.email}> \n${data.message}`,
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



// EXPRESS SERVER LISTENING
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
