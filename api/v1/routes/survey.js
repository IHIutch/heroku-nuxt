const express = require("express");
const router = express.Router();
const { Stop, Question } = require("../models/index");

router.get("/:stopId/", (req, res) => {
  const stopId = req.params.stopId;

  const stop = Stop.findOne({
    where: {
      stopId: stopId,
    },
  });
  const questions = Question.findAll({ where: { active: true } });

  Promise.all([stop, questions])
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
