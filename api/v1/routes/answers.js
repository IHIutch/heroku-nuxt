import express from "express";
import { Answer } from "../models/index";

const router = express.Router();

router.get("/", (req, res) =>
  Answer.findAll({})
    .then((stops) => {
      res.json(stops);
    })
    .catch((err) => console.log(err))
);

router.post("/create", (req, res) => {
  const { sessionId, answers } = req.body;
  Category.bulkCreate(
    answers.map((answer) => {
      return {
        sessionId,
        ...answer,
      };
    })
  )
    .then(res.sendStatus(201))
    .catch((err) => console.log(err));
});

export default router;
