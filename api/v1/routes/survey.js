import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import { Answer, Question, Watcher } from '../models/index'
import { answerType, apiStatusType } from '../../../lib/types'

const router = express.Router()

router.post('/:stopId', async (req, res) => {
  try {
    const stopId = req.params.stopId
    const sessionId = uuidv4()
    const { answers, status } = req.body

    await Answer.bulkCreate(
      answers.map((answer) => {
        return {
          sessionId,
          stopId,
          ...answer,
        }
      })
    )

    const questions = await Question.findAll({
      include: [
        'category',
        {
          association: 'prevAnswers',
          where: {
            stopId,
          },
        },
      ],
    })

    // Calculate scores based on previous answers
    const scores = questions.reduce((acc, q) => {
      const cat = q.category.value
      const pts = q.prevAnswers.length
        ? q.prevAnswers.map((a) => (a.value === answerType.TRUE ? 1 : 0))
        : [-1]
      acc[cat] = acc[cat] ? acc[cat].concat(pts) : pts
      return acc
    }, {})
    Object.keys(scores).forEach((k) => {
      const calcedScore = scores[k].reduce((acc, val) => {
        return (acc += val)
      }, 0)

      scores[k] = parseFloat(
        ((calcedScore / scores[k].length) * 100).toFixed(2)
      )
    })

    scores.overall = Object.values(scores).reduce(
      (acc, v) =>
        (acc += parseFloat((v / Object.keys(scores).length).toFixed(2))),
      0
    )

    await Watcher.upsert({
      stopId,
      status,
      scores,
    })

    res.sendStatus(apiStatusType.SUCCESS)
  } catch (err) {
    res.sendStatus(apiStatusType.NOT_FOUND)
    throw new Error(err)
  }
})

export default router
