import express from 'express'
import { Stop } from '../models/index'

const router = express.Router()

router.get('/', (req, res) => {
  Stop.findAll({
    limit: 100,
    order: [['id', 'ASC']],
    include: ['watcher'],
  })
    .then((data) => {
      res.status(201).json(data)
    })
    .catch((err) => {
      throw new Error(err)
    })
})

router.get('/:id', (req, res) => {
  const { id } = req.params

  Stop.findByPk(id, {
    include: ['watcher', 'answers'],
  })
    .then((data) => {
      res.status(201).json(data)
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
    .then((data) => {
      res.status(201).json(data)
    })
    .catch((err) => {
      throw new Error(err)
    })
})

export default router
