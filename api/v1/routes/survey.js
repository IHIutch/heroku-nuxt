import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import { Stop, Question, Watcher, Answer, Category } from '../models/index'

const router = express.Router()

router.get('/:stopId', (req, res) => {
  const stopId = req.params.stopId

  const stop = Stop.findOne({ where: { stopId } })
  const questions = Question.findAll({ where: { active: true } })
  const watcher = Watcher.findOne({ where: { stopId } })

  Promise.all([stop, questions, watcher])
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      throw new Error(err)
    })
})

router.post('/:stopId', (req, res) => {
  const stopId = req.params.stopId
  const sessionId = uuidv4()
  const { answers, watcher } = req.body

  Watcher.findOne({ where: { stopId } })
    .then((existingWatcher) => {
      if (existingWatcher) {
        existingWatcher
          .update({
            status: watcher,
          })
          .catch((err) => {
            throw new Error(err)
          })
      } else {
        Watcher.create({
          stopId,
          status: watcher,
        }).catch((err) => {
          throw new Error(err)
        })
      }
    })
    .catch((err) => {
      throw new Error(err)
    })

  Answer.bulkCreate(
    answers.map((answer) => {
      return {
        sessionId,
        stopId,
        ...answer,
      }
    })
  )
    .then(() => {
      const allCategories = Category.findAll({ raw: true })
      const allQuestions = Question.findAll({
        raw: true,
        where: { active: true },
      })
      const allAnswers = Answer.findAll({
        raw: true,
        where: { stopId },
        order: [['id', 'DESC']],
      })

      Promise.all([allQuestions, allAnswers, allCategories])
        .then((data) => {
          const [questionQ, answerQ, categoryQ] = data

          const answersByQuestion = () => {
            return questionQ.map((question) => {
              const answer = answerQ.find((a) => {
                return a.questionId === question.id
              })
              return {
                ...question,
                score: answer && answer.value === 'true' ? 1 : 0,
              }
            })
          }

          const questionByCategory = () => {
            return categoryQ.map((c) => {
              const aByQ = answersByQuestion()
              const questions = aByQ.filter((q) => {
                return q.categoryId === c.id
              })
              const score = questions.reduce((acc, q) => {
                return (acc += q.score)
              }, 0)

              return {
                category: c.text,
                score: parseFloat(
                  ((score / questions.length) * 100).toFixed(0)
                ),
              }
            })
          }

          Stop.findOne({ where: { stopId } }).then((stop) => {
            stop
              .update({
                categoryScores: questionByCategory(),
              })
              .then(res.sendStatus(201))
              .catch((err) => {
                throw new Error(err)
              })
          })
        })
        .catch((err) => {
          throw new Error(err)
        })
    })
    .catch((err) => {
      throw new Error(err)
    })
})

export default router
