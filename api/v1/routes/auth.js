import express from "express";
import { User } from "../models/index";

const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (typeof email !== "undefined" && typeof password !== "undefined") {
    User.findOne({
      where: {
        email: email,
      },
    })
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            error: "User not found",
          });
        }
        bcrypt.compare(password, user.password).then((isMatch) => {
          if (isMatch) {
            const payload = {
              id: user.id,
              email: user.email,
            };
            // Sign Token
            jwt.sign(payload, "secret", { expiresIn: 7200 }, (err, token) => {
              res.json({
                token: token,
              });
            });
          } else {
            return res.status(400).json({
              error: "Password invalid",
            });
          }
        });
      })
      .catch((err) => console.log(err));
  } else {
    return res.status(404).json({ error: "Email and password required" });
  }
});

router.get("/user", (req, res) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== undefined) {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];

    jwt.verify(token, "secret", (err, data) => {
      if (err) {
        res.json({ user: false });
      } else {
        res.json({ user: { email: data.email } });
      }
    });
  } else {
    res.json({ user: false });
  }
});

export default router;
