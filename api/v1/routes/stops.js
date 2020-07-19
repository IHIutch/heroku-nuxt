const express = require("express");
const router = express.Router();
const { Stop, Question, Answer } = require("../models/index");

router.get("/", (req, res) =>
  Stop.findAll({
    limit: 100,
  })
    .then((stops) => {
      res.json(stops);
    })
    .catch((err) => console.log(err))
);

router.post("/", (req, res) => {
  const { stopName, stopCode, stopDesc, stopLat, stopLon } = req.body;

  Stop.create({
    stopName,
    stopCode,
    stopDesc,
    stopLat,
    stopLon,
  })
    .then(res.sendStatus(201))
    .catch((err) => console.log(err));
});

router.get("/:stopId/", (req, res) => {
  const stopId = req.params.stopId;

  const stop = Stop.findOne({
    where: {
      stopId: stopId,
    },
  });
  const questions = Question.findAll({ where: { active: true } });
  const answers = Answer.findAll({ where: { stopId } });

  Promise.all([stop, questions, answers])
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
