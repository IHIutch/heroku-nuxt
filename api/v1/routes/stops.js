import express from 'express'
import { Stop } from '../models/index'
import { apiStatusType } from '../../../lib/types'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const { limit = null, order = null, where = null } = req.query
    const data = await Stop.findAll({
      limit,
      order,
      where,
      include: ['watcher'],
    })
    res.status(apiStatusType.SUCCESS).json(data)
  } catch (err) {
    throw new Error(err)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const data = await Stop.findByPk(id, {
      include: ['watcher', 'answers'],
    })
    res.status(apiStatusType.SUCCESS).json(data)
  } catch (err) {
    throw new Error(err)
  }
})

router.post('/', async (req, res) => {
  try {
    const { stopName, stopCode, stopDesc, stopLat, stopLon } = req.body
    const data = await Stop.create({
      stopName,
      stopCode,
      stopDesc,
      stopLat,
      stopLon,
    })
    res.status(apiStatusType.SUCCESS).json(data)
  } catch (err) {
    throw new Error(err)
  }
})

export default router
