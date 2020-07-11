const express = require("express");
const router = express.Router();
const { User } = require("../models/index");

router.get("/", (req, res) => {
  res.json({ user: { email: "jbhutch01@gmail.com" } });
});
