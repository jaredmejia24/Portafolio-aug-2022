const express = require("express");

//controllers
const { sendEmail, status } = require("../controllers/emails.controller");
//validators
const {
  sendEmailValidators,
} = require("../middlewares/validators.middlewares");

const emailsRouter = express.Router();

emailsRouter.post("/", sendEmailValidators, sendEmail);

emailsRouter.get("/", status)

module.exports = { emailsRouter };
