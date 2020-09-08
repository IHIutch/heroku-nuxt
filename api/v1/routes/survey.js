import express from "express";
import { Stop, Question, Watcher, Answer, Category } from "../models/index";
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

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
  ).catch((err) => console.log(err));

  const categories = Category.findAll({ raw: true });
  const questions = Question.findAll({ raw: true, where: { active: true } });
  const queryAnswers = Answer.findAll({
    raw: true,
    where: { stopId },
    order: [["id", "DESC"]],
  });

  Promise.all([questions, queryAnswers, categories])
    .then((data) => {
      const [questionQ, answerQ, categoryQ] = data;

      const recentAnswers = () => {
        return answerQ.reduce((acc, answer) => {
          acc[answer.questionId] = [...(acc[answer.questionId] || []), answer];
          return acc;
        }, {});
      };

      const answersbyQuestion = () => {
        return questionQ.map((question) => {
          const recAns = recentAnswers();
          const mappedAnswer =
            recAns && recAns[question.id] ? recAns[question.id][0] : null;
          return {
            ...question,
            answer: mappedAnswer,
            score: mappedAnswer && mappedAnswer.value === "true" ? 1 : 0,
          };
        });
      };

      const questionByCategory = () => {
        return categoryQ.map((cat) => {
          const aByQ = answersbyQuestion();
          const mappedQuestions = aByQ.filter((question) => {
            return question.categoryId == cat.id;
          });
          const score = mappedQuestions.reduce((acc, question) => {
            return (acc += question.score);
          }, 0);

          return {
            category: cat.text,
            score: parseFloat(
              ((score / mappedQuestions.length) * 100).toFixed(0)
            ),
          };
        });
      };

      Stop.findOne({ where: { stopId } }).then((stop) => {
        stop
          .update({
            categoryScores: questionByCategory(),
          })
          .then(res.sendStatus(201))
          .catch((err) => console.log(err));
      });
    })
    .catch((err) => console.log(err));
});

export default router;
