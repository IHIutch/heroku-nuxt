import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import { Watcher, Answer } from '../models/index'

const router = express.Router()

router.post('/:stopId', (req, res) => {
  const stopId = req.params.stopId
  const sessionId = uuidv4()
  const { answers, watcher } = req.body

  // Watcher.findOne({ where: { stopId } })
  //   .then((existingWatcher) => {
  //     if (existingWatcher) {
  //       existingWatcher
  //         .update({
  //           status: watcher,
  //         })
  //         .catch((err) => {
  //           throw new Error(err)
  //         })
  //     } else {
  //       Watcher.create({
  //         stopId,
  //         status: watcher,
  //       }).catch((err) => {
  //         throw new Error(err)
  //       })
  //     }
  //   })
  //   .catch((err) => {
  //     throw new Error(err)
  //   })

  Answer.bulkCreate(
    answers.map((answer) => {
      return {
        sessionId,
        stopId,
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
