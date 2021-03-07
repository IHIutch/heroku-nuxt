import express from 'express'
import { Stop, Question, Answer, Category } from '../models/index'

const router = express.Router()

router.get('/', (req, res) => {
  Stop.findAll({
    limit: 100,
    order: [['id', 'ASC']],
  })
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      throw new Error(err)
    })
})

router.post('/', (req, res) => {
  const { stopName, stopCode, stopDesc, stopLat, stopLon } = req.body

  Stop.create({
    stopName,
    stopCode,
    stopDesc,
    stopLat,
    stopLon,
  })
    .then(res.sendStatus(201))
    .catch((err) => {
      throw new Error(err)
    })
})

router.get('/:stopId/', (req, res) => {
  const stopId = req.params.stopId

  const stop = Stop.findOne({
    where: { stopId },
  })
  const categories = Category.findAll()
  const questions = Question.findAll({ where: { active: true } })
  const answers = Answer.findAll({
    where: { stopId },
    order: [['id', 'DESC']],
  })

  Promise.all([stop, categories, questions, answers])
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      throw new Error(err)
    })
})

export default router
