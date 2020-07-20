const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const { Stop, Question, Watcher, Answer } = require("../models/index");

router.get("/:stopId", (req, res) => {
  const stopId = req.params.stopId;

  const stop = Stop.findOne({ where: { stopId } });
  const questions = Question.findAll({ where: { active: true } });
  const watcher = Watcher.findOne({ where: { stopId } });

  Promise.all([stop, questions, watcher])
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
});

router.post("/:stopId", (req, res) => {
  const stopId = req.params.stopId;
  const sessionId = uuidv4();
  const { answers, watcher } = req.body;

  Watcher.findOne({ where: { stopId } })
    .then((existingWatcher) => {
      if (existingWatcher) {
        existingWatcher
          .update({
            status: watcher,
          })
          .catch((err) => console.log(err));
      } else {
        Watcher.create({
          stopId,
          status: watcher,
        }).catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));

  Answer.bulkCreate(
    answers.map((answer) => {
      return {
        sessionId,
        stopId,
        ...answer,
      };
    })
  )
    .then(res.sendStatus(201))
    .catch((err) => console.log(err));
});

module.exports = router;
