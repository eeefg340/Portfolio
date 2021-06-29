const express = require("express");
const Router = express.Router();
const nodemailer = require("nodemailer");
require("dotenv").config();
const { BodyPromise } = require("../Promise/BodyPromise");

Router.post("/mail", async (req, res) => {
  const body = req.body;

  try {
    await BodyPromise(body);

    let transport = nodemailer.createTransport({
      host: "smtp.office365.com", // hostname
      port: 587, // port for secure SMTP

      auth: {
        user: "odmail@odtranslate.co.il",
        pass: "Osnat1308",
      },
      logger: true,
      debug: true, // include SMTP traffic in the logs
    });

    let mailOptions = {
      from: "odmail@odtranslate.co.il",
      to: "dinroda123@gmail.com",
      subject: "פניה חדשה",
      text: `פנייה חדשה מתוך תיק העבודות : 
        שם פרטי: ${body.FirstName}
        שם משפחה: ${body.LastName}
        מייל: ${body.Email}
        נושא: ${body.Subject}
        פרטים נוספים: ${body.TextArea}`,
    };

    transport.sendMail(mailOptions, function (err, data) {
      if (err) throw new TypeError(err);
      res.status(200).json({
        msg: "The mail sent successfully",
        Success: true,
      });
    });
  } catch (e) {
    if (e instanceof TypeError) {
      res.status(500).json({
        err: "Send mail was faild.. try again",
        Success: false,
      });
    }
    console.error(e.message);
    res.status(400).json({
      err: "Pleaze complete all  fields",
      Success: false,
    });
  }
});

module.exports = Router;
