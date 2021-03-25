import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import { Watcher, Answer } from '../models/index'
import { apiStatusType } from '../../../lib/types'

const router = express.Router()

router.post('/:stopId', async (req, res) => {
  try {
    const stopId = req.params.stopId
    const sessionId = uuidv4()
    const { answers, watcher } = req.body

    const data = await Answer.bulkCreate(
      answers.map((answer) => {
        return {
          sessionId,
          stopId,
          ...answer,
        }
      })
    )
    res.status(apiStatusType.SUCCESS).json(data)
  } catch (err) {
    throw new Error(err)
  }
})

export default router
