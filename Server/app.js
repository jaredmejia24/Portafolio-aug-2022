const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

const dotenv = require("dotenv");

dotenv.config();

// Routers
const { emailsRouter } = require("./routes/emails.routes");

// Controllers
const { globalErrorHandler } = require("./controllers/error.controller");

// Init our Express app
const app = express();

// Enable Express app to receive JSON data
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use(
  helmet(
    {
      contentSecurityPolicy: false,
    },
    { crossOriginOpenerPolicy: { policy: "unsafe-none" } }
  )
);

app.use(compression());

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
else if (process.env.NODE_ENV === "production") app.use(morgan("combined"));

// Enable cors
app.use(cors());

// Define endpoints
app.use("/api/v1/emails", emailsRouter);
app.use("/ap1/v1/status", (req, res) => {
  res.status(200).json({
    status: "the server is running",
  });
});

// Global error handler
app.use(globalErrorHandler);

app.use("/", (req, res, next) => {
  const indexPath = path.join(__dirname, "public", "index.html");

  res.status(200).sendFile(indexPath);
});

// Catch non-existing endpoints
app.all("*", (req, res) => {
  res.status(404).json({
    status: "error",
    message: `${req.method} ${req.url} does not exists in our server`,
  });
});

module.exports = { app };
