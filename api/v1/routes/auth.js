const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/login", (req, res) => {
  // const email = req.body.email,
  //   password = req.body.password;

  // User.findOne({
  //   where: {
  //     email: email,
  //   },
  // })
  //   .then((user) => {
  //     if (!user) {
  //       return res.status(404).json({ error: "User not found" });
  //     }
  //     bcrypt.compare(password, user.password).then((isMatch) => {
  //       if (isMatch) {
  const payload = {
    id: "1",
    email: "jbhutch01@gmail.com",
  };

  // Sign Token
  jwt.sign(payload, "secret", { expiresIn: 7200 }, (err, token) => {
    res.json({
      token: token,
    });
  });
  //         } else {
  //           return res.status(400).json({ error: "Password invalid" });
  //         }
  //       });
  //     })
  //     .catch((err) => console.log(err));
});

// function verifyToken(req, res, next) {
//   const bearerHeader = req.headers['authorization'];
//   if (typeof bearerHeader !== 'undefined') {
//     const bearer = bearerHeader.split(" ");
//     const bearerToken = bearer[1];
//     req.token = bearerToken;
//     next();
//   } else {
//     res.sendStatus(403)
//   }
// }

router.get("/user", (req, res) => {
  const payload = { user: { email: "test@email.com" } };
  console.log(payload);
  res.json(payload);
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

module.exports = router;
