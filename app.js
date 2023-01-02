const express = require("express");
const ApiError = require("./app/api-error");
const cors = require("cors");
const app = express();
const backendRouter = require("./app/routes/route");

app.use(cors());
app.use(express.json());
app.use("/api", backendRouter);


app.get("/", (req, res) => {
    res.json({message: "Welcome to web application."});
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



