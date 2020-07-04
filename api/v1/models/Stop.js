const Sequalize = require('sequelize')
const db = require('../config')

const Stop = db.define('stop', {
  stop_name: {
    type: Sequalize.STRING,
  },
  stop_code: {
    type: Sequalize.INTEGER,
  },
  stop_desc: {
    type: Sequalize.STRING,
  },
  stop_lat: {
    type: Sequalize.FLOAT,
  },
  stop_lon: {
    type: Sequalize.FLOAT,
  },
})

module.exports = Stop
