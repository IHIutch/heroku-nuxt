const express = require("express");
const router = express.Router();
// const { User } = require("../models/index");

router.post("/login", (req, res) => {
  const payload = { token: "123" };
  console.log(payload);
  res.json(payload);
});

router.get("/users", (req, res) => {
  const payload = { user: { email: "test@email.com" } };
  console.log(payload);
  res.json(payload);
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

module.exports = router;
