const express = require("express");
const router = express.Router();
const passport = require("passport");
const { User } = require("../models/index");

router.get("/user", (req, res) => {
  res.json({ user: { email: "jbhutch01@gmail.com" } });
});
