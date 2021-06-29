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
      host: "smtp.gmail.com",
      port: 465,
      secure: true,

      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    let mailOptions = {
      from: `${process.env.USER}`,
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
