const express = require("express");
const app = express();

app.use(express.json());

app.use("/auth", require("./routes/auth"));
app.use("/stops", require("./routes/stops"));
app.use("/users", require("./routes/users"));
app.use("/questions", require("./routes/questions"));
app.use("/categories", require("./routes/categories"));
app.use("/answers", require("./routes/answers"));
app.use("/survey", require("./routes/survey"));
app.use("/admin", require("./routes/admin"));

module.exports = app;
