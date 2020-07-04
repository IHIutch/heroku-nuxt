const express = require('express')
const app = express()

// Connect to DB
const db = require('./config')

db.authenticate()
  .then(() => console.log('Database connected!'))
  .catch((err) => console.log('Error: ' + err))

app.use(express.json())

app.use('/stops', require('./routes/stops'))

module.exports = app
