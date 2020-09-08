import express from "express";
import { Question } from "../models/index";

const router = express.Router();

router.post("/create", (req, res) => {
  const { text, type, answers, categoryId } = req.body;

  Question.create({
    text,
    type,
    answers,
    categoryId,
  })
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => console.log(err));
});

router.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const data = req.body;

  Question.findByPk(id)
    .then((question) => {
      if (!question) {
        return res.status(404).json({ error: "Question not found" });
      } else {
        question
          .update(data)
          .then(res.sendStatus(201))
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
});

module.exports = router;
