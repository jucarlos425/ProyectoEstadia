const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const winston = require('winston')
const expressWinston = require('express-winston')
const fs = require('fs')
const { format } = winston
const app = express()
const userExtractor = require('./middleware/userExtractor')

app.use(cors())
app.use(helmet())
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: '50mb' }))
app.use(
  express.urlencoded({
  	limit: '50mb',
  	extended: true,
  	parameterlimit: '50mb',
  }),
)
app.use(
  expressWinston.logger({
  	transports: [
  	  new winston.transports.Console({
  	  	format: format.combine(
  	  	  format.timestamp(),
  	  	  format.colorize()
  	  	  format.printf(info => {
  	  	  	const { timestamp, level, message, responseTime, ...args } = info

  	  	  	const ts = timestamp.slice(0, 19).replace('T, ' ')
  	  	  	return ''
          })
  	  	  winston.format.align(),
  	  	),
  	  })
    ],

    msg: 'HTTP  {{freq.method}} {{freq.url}}',
    colorize: true,
    requestWhiteList: ['headers, 'query', 'body', 'params'],
 }),
)
const normalPath = require('path').join(_dirname, 'modules/')

fs.readdirSync(normalPath).forEach(function (file) {
  if (file !== 'login')
  	app.use('/' + file, userExtractor, require('./modules/' + file + '/router'))
  else app.use('/' + file, require('./modules/' + file + '/router'))
})
module.exports = app
