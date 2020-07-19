const express = require("express");
const router = express.Router();
const { Category, Question } = require("../models/index");

router.get("/", (req, res) => {
  const questions = Question.findAll();
  const categories = Category.findAll();

  Promise.all([questions, categories])
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
