const app = require('./express/app')
const sequelize = require('./sequelize')
const http = require('http')
require('dotenv').config()

const PORT = process.env.DATABASE_PORT
const USER = process.env.DB_USER
const PASSWORD = process.env.DB_PASSWORD
async function assertDatabaseConnectionOk() {
  console.debug('Checking database connection', PORT, USER, PASSWORD)
  try {
    await sequelize.authenticate()
    console.debug('Database connection ok')
  } catch (err) {
    console.error('Could not connect', err)
    process.exit(1)
  }
}

async function init() {
  await assertDatabaseConnectionOk()
  if (process.env.SYNC_MODELS === 'alter') {
    await sequelize.sync({
      alter: true,
    })
  }

  if (process.env.SYNC_MODELS === 'force') {
    await sequelize.sync({
      alter: true,
      force: true,
    })
    try {
      await sequelize.models.usuario.bulkCreate([
        {
          usuario: 'admin',
          correo: 'admin@localhost',
          role: 1,
          hash: 'c8faebdeda0ff19b82cbd761853bb297cc321389996552677a8d131b94f5dd3f',
          salt: '927769e4812b66cc',
        },
        {
          usuario: 'alumno',
          correo: 'alumno@localhost',
          role: 2,
          hash: 'c8faebdeda0ff19b82cbd761853bb297cc321389996552677a8d131b94f5dd3f',
          salt: '927769e4812b66cc',
        },
      ])

      await sequelize.models.profesor.create({
        nombre: 'Profesor de prueba',
        apellidoPaterno: 'Apellido Paterno',
        apellidoMaterno: 'Apellido Materno',
        usuarioId: 1,
      })

      await sequelize.models.tutor.create({
        carrera: 'Ingeniería en Sistemas Computacionales',
        puesto: 'Tutor',
        correo: 'tutor@localhost',
        nombre: 'Tutor de prueba',
        apellidoPaterno: 'Apellido Paterno',
        apellidoMaterno: 'Apellido Materno',
      })

      await sequelize.models.alumno.create({
        nombre: 'Alumno de prueba',
        apellidoPaterno: 'Apellido Paterno',
        apellidoMaterno: 'Apellido Materno',
        cuatrimestre: 1,
        carrera: 'Ingeniería en Sistemas Computacionales',
        matricula: '123456789',
        usuarioId: 2,
        tutorId: 1,
      })
    } catch (error) {
      console.error(error)
    }
  }
  console.debug('Models synced')
  console.debug(`Starting sequelize on port ${process.env.PORT} `)
}

const server = http.createServer(app)
server.listen(process.env.PORT, () => {
  console.debug(`Express server started on port ${process.env.PORT}`)
})

init()
