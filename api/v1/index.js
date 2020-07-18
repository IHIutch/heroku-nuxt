const express = require("express");
const app = express();

app.use(express.json());

app.use("/auth", require("./routes/auth"));
app.use("/stops", require("./routes/stops"));
app.use("/users", require("./routes/users"));

module.exports = app;
