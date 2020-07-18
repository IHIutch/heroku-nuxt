const express = require("express");
const app = express();
const cors = require('cors');

const origin =
  process.env.NODE_ENV === "production"
    ? "http://nuxt.herokuapp.com"
    : "http://localhost:3000";

app.use(express.json());
app.use(cors({
  origin: origin
}))

app.use("/auth", require("./routes/auth"));
app.use("/stops", require("./routes/stops"));
app.use("/users", require("./routes/users"));

module.exports = app;
