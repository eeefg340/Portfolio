const express = require("express");
const Router = express.Router();

const nodemailer = require("nodemailer");
require("dotenv").config();
// const ContactModels = require("../models/Contacts");

Router.post("/mail", (req, res) => {
  const body = req.body;
  let Promises = [body.FirstName, body.LastName, body.Email, body.Subject];

  console.log(body);


  async function CheckBody() {
    try {
        Promise.all(
            Promises.map(async (x) => {
                console.log(x)
            })
        )
      

      let transport = nodemailer.createTransport({
        service: "Gmail",

        auth: {
          user: process.env.USER,
          pass: process.env.PASS,
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
        if (err) {
          console.log("Error Occurs", err);
        } else {
          console.log("Email sent!!");
        }
      });
    } catch (e) {
      console.error(e.message);
    }
  }
  CheckBody();
});

module.exports = Router;
