const { models } = require('../../../sequelize')
const sequelize = require('../../../sequelize')
const { hashPassword } = require('../usuario/helper')

const model = 'alumno'
const message = 'Alumno'

module.exports = {
  getAll: async (req, res) => {
    try {
      const data = await models[model].findAll({
        where: {
          status: true,
        },
        include: [
          {
            model: models.usuario,
            required: true,
          },
          {
            model: models.tutor,
            required: true,
          },
        ],
      })
      res.status(200).send({
        data,
        status: 'success',
        message: message + 's conseguidos!',
      })
    } catch (err) {
      res.status(400).send({ status: 'error', message: err.message })
    }
  },

  create: async (req, res) => {
    const transaction = await sequelize.transaction()
    try {
      const alumno = await alumnoUsuario(req.body)

      res.status(201).send({ status: 'success', message: message + ' creado!' })
    } catch (err) {
      res.status(400).send({ status: 'error', message: err.message })
    }
  },

  update: async (req, res) => {
    try {
      const data = await models[model].update(req.body, {
        where: {
          id: req.body.id,
        },
      })
      res
        .status(200)
        .send({ status: 'success', message: message + ' actualizado!' })
    } catch (err) {
      res.status(400).send({ status: 'error', message: err.message })
    }
  },

  delete: async (req, res) => {
    try {
      const data = await models[model].update(
        { status: 0 },
        {
          where: {
            id: req.body.id,
          },
        }
      )
      res
        .status(200)
        .send({ status: 'success', message: message + ' eliminado!' })
    } catch (err) {
      res.status(400).send({ status: 'error', message: err.message })
    }
  },
}

const alumnoUsuario = async data => {
  return new Promise(async (resolve, reject) => {
    const transaction = await sequelize.transaction()
    try {
      const tempPwd = generateString(16)
      let { hash, salt } = hashPassword(tempPwd)

      const user = await models.usuario.create(
        {
          usuario: `${data.nombre.toLowerCase()} ${data.apellidoPaterno.toLowerCase()}`,
          correo: `${data.nombre.toLowerCase()}@upq.edu.mx`,
          role: 2,
          hash,
          salt,
        },
        {
          transaction: transaction,
        }
      )

      const alumno = await models[model].create(
        { ...data, usuarioId: user.id, tutorId: 1 },
        {
          transaction: transaction,
        }
      )

      await transaction.commit()
      resolve(alumno)
    } catch (error) {
      await transaction.rollback()
      reject(error)
    }
  })
}

const generateString = length => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  console.log('Temporal password generated: ', result)
  return result
}
