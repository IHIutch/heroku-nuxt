import express from 'express'
import { Watcher } from '../models/index'

const router = express.Router()

router.get('/:stopId', (req, res) => {
  const { stopId } = req.params

  Watcher.findOne({ where: { stopId: parseInt(stopId) } })
    .then((data) => {
      res.status(201).json(data)
    })
    .catch((err) => {
      throw new Error(err)
    })
})

export default router
