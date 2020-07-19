const express = require("express");
const app = express();

app.use(express.json());

app.use("/auth", require("./routes/auth"));
app.use("/stops", require("./routes/stops"));
app.use("/users", require("./routes/users"));
app.use("/question", require("./routes/questions"));
app.use("/category", require("./routes/categories"));
app.use("/answers", require("./routes/answers"));
app.use("/survey", require("./routes/survey"));

module.exports = app;
