import express from 'express'
import { Answer, Category } from '../models/index'

const router = express.Router()

router.get('/', (req, res) =>
  Answer.findAll({})
    .then((stops) => {
      res.json(stops)
    })
    .catch((err) => {
      throw new Error(err)
    })
)

router.post('/create', (req, res) => {
  const { sessionId, answers } = req.body
  Category.bulkCreate(
    answers.map((answer) => {
      return {
        sessionId,
        ...answer,
      }
    })
  )
    .then(res.sendStatus(201))
    .catch((err) => {
      throw new Error(err)
    })
})

export default router
