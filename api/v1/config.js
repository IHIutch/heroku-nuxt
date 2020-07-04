const { Sequelize } = require('sequelize')

module.exports = new Sequelize('ratemystop', 'postgres', 'root', {
  host: 'localhost',
  dialect: 'postgres',
})
