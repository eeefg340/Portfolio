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
      service: "Gmail",
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
        clientId: '000000000000-xxx0.apps.googleusercontent.com',
        clientSecret: 'XxxxxXXxX0xxxxxxxx0XXxX0',
        refreshToken: '1/XXxXxsss-xxxXXXXXxXxx0XXXxxXXx0x00xxx',
        accessToken: 'ya29.Xx_XX0xxxxx-xX0X0XxXXxXxXXXxX0x',
        expires: 1484314697598
      },
    });

    let mailOptions = {
      from: "naor0003@gmail.com",
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
