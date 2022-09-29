const express = require("express");
const responseTime = require("response-time");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const compression = require("compression");
const morgan = require("morgan");
const app = express();
app.use(morgan("dev"));
app.use((req, res, next) => {
  console.log("Oke Ổn");
  next();
});
app.use(responseTime());
app.enable("trust proxy");
app.get("/api/", (req, res) => {
  const health_check = {
    uptime: process.uptime(),
    message: "Tài Đẹp trai ",
    timestamp: Date.now(),
  };
  return res.send(health_check);
});
app.use(
  compression({
    level: 6,
    threshold: 100 * 1000,
    filter: (req, res) => {
      if (req.headers["x-no-compression"]) {
        return false;
      }
      return compression.filter(req, res);
    },
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  express.json({
    verify: (req, res, buffer) => (req["rawBody"] = buffer),
  })
);
//!router import
const restaurant = require("./Routes/RestaurantsRoute");

//!Link router Main
app.use("/api", restaurant);

module.exports = app;
