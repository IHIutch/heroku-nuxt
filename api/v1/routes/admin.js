import express from 'express'
import { Category, Question } from '../models/index'

const router = express.Router()

router.get('/', (req, res) => {
  const questions = Question.findAll()
  const categories = Category.findAll()

  Promise.all([questions, categories])
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      throw new Error(err)
    })
})

export default router
