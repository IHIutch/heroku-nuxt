const express = require("express");
const app = express();

app.use(express.json());
app.use("/stops", require("./routes/stops"));

module.exports = app;
