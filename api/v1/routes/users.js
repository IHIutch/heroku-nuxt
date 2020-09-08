import express from "express";
import { User } from "../models/index";

const bcrypt = require("bcryptjs");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ user: { email: "jbhutch01@gmail.com" } });
});

router.post("/register", (req, res) => {
  const { email, password } = req.body;

  if (typeof email !== "undefined" && typeof password !== "undefined") {
    User.findOne({
      where: {
        email: email,
      },
    }).then((user) => {
      if (user) {
        return res.status(404).json({ error: "That email already exists" });
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;

            User.create({
              email: email,
              password: hash,
            })
              .then(res.sendStatus(201))
              .catch((err) => console.log(err));
          });
        });
      }
    });
  } else {
    return res.status(404).json({ error: "Email and password required" });
  }
});

export default router;
