const express = require("express");
const ApiError = require("./app/api-error");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require('multer');
const backendRouter = require("./app/routes/route");
const products = require('./app/controllers/products.controller');

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "DELETE", "OPTIONS", "HEAD"],
    credentials: true,
  })
);

const uploadPath = path.join(__dirname, 'uploads');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", backendRouter);
app.use('/uploads', express.static(uploadPath));
app.get("/", (req, res) => {
  res.json({ message: "Welcome to web application." });
});

app.use((req, res, next) => {
  return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});
module.exports = app;
