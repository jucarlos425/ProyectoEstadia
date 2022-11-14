const { Sequelize } = require('sequelize')
const fs = require('fs')
const { applyAssociation } = require('./associations')
require('dotenv').config()

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: 'mysql',
    host: process.env.HOST,
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
    },
    port: process.env.DATABASE_PORT,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
    },
  },
  {
    benchmark: true,
    logging: (logStr, execTime, options) => {
      if (!options) {
        options = execTime
        execTime = undefined
      }
      let col = null
      switch (options.type) {
        case 'SELECT':
          col = colors.blue.bold
          break
        case 'UPDATE':
          col = colors.yellow.bold
          break
        case 'INSERT':
          col = colors.green.bold
          break
        default:
          col = colors.white.bold
          break
      }

      if (execTime) {
        if (execTime >= 10) {
          col = colors.red.bold
          console.debug(colors.magenta.bold(`[${execTime} ms]`), col(logStr))
        } else {
          console.debug(col(logStr))
        }
      }
    },
  }
)

const normalPath = require('path').join(__dirname, 'models')
const modelDefiners = []
fs.readdirSync(normalPath).forEach(function (file) {
  modelDefiners.push(require('./models/' + file))
})

for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize)
}

applyAssociation(sequelize)

module.exports = sequelize
