const express = require("express");
const app = express();

// const db = require("./models/index");

app.use(express.json());
app.use("/stops", require("./routes/stops"));

module.exports = app;
