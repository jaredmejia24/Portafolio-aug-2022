const express = require("express");

//controllers
const { sendEmail, status, verify } = require("../controllers/emails.controller");
//validators
const {
  sendEmailValidators,
} = require("../middlewares/validators.middlewares");

const emailsRouter = express.Router();

emailsRouter.post("/", sendEmail);

emailsRouter.get("/", status)

emailsRouter.post("/verify",sendEmailValidators, verify)

module.exports = { emailsRouter };
