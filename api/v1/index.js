import express from "express";
import auth from "./routes/auth";
import stops from "./routes/stops";
import users from "./routes/users";
import questions from "./routes/questions";
import categories from "./routes/categories";
import survey from "./routes/survey";
import admin from "./routes/admin";

const app = express();
app.use(express.json());

app.use("/auth", auth);
app.use("/stops", stops);
app.use("/users", users);
app.use("/questions", questions);
app.use("/categories", categories);
app.use("/answers", answers);
app.use("/survey", survey);
app.use("/admin", admin);

module.exports = app;
