const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
// const paypal = require('paypal-rest-sdk');
// const passport = require("passport");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Credentials", true);

  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type,  Accept, Authorization"
  );
  if ("OPTIONS" == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Passport Config
// require("./config/passport")(passport);

app.use(bodyParser.urlencoded({ limit: "700mb", extended: true }));
// app.use(express.json());
app.use(bodyParser.json({ limit: "700mb" }));

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(morgan("dev")); // log every request to the console

const root = require("path").join(__dirname, "/public");
app.use(express.static(root));
app.get("/login", (req, res) => {
  res.sendFile("index.html", { root });
});
app.get("/register", (req, res) => {
  res.sendFile("index.html", { root });
});


const RouteLikes = require("./routes/Likes");
app.use("/", RouteLikes)

const RouteNodeMail = require("./routes/NodeMailer");
app.use("/", RouteNodeMail)



app.use(function (req, res, next) {
  res.status(404).send("אופס משהו קרה רענן את הדף עכשיו");
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server listening on port ${port}`));
