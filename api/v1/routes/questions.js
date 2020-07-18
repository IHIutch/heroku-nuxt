const express = require("express");
const router = express.Router();
const { Question, Category } = require("../models/index");

router.post("/question/create", (req, res) => {
  const { text, type, answers, categoryId } = req.body;

  Question.create({
    text,
    type,
    answers,
    categoryId,
  })
    .then(res.sendStatus(201))
    .catch((err) => console.log(err));
});

router.post("/question/update", (req, res) => {
  const { id, text, type, answers, categoryId, active } = req.body;

  Question.findOne({ where: { id: id } })
    .then((question) => {
      if (!question) {
        return res.sendStatus(404).json({ error: "Question not found" });
      } else {
        question
          .update({
            text,
            type,
            answers,
            categoryId,
            active,
          })
          .then(res.sendStatus(201))
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
});

router.post("/category/create", (req, res) => {
  const { text, value } = req.body;

  Category.create({
    text,
    value,
  })
    .then(res.sendStatus(201))
    .catch((err) => console.log(err));
});

router.post("/category/update", (req, res) => {
  const { id, text, value } = req.body;

  Category.findOne({ where: { id: id } })
    .then((category) => {
      if (!category) {
        return res.sendStatus(404).json({ error: "Category not found" });
      } else {
        category
          .update({
            text,
            value,
          })
          .then(res.sendStatus(201))
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
});
