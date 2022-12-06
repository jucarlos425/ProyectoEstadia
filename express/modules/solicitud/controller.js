const { models } = require('../../../sequelize')

const model = 'solicitud'
const message = 'Solicitud'

module.exports = {
  getAll: async (req, res) => {
    try {
      const data = await models[model].findAll({
        where: {
          status: true,
        },
        include: [
          {
            model: models.alumno,
            required: true,
          },
        ],
      })
      res.status(200).send({
        data,
        status: 'success',
        message: message + ' es conseguidas!',
      })
    } catch (err) {
      res.status(400).send({ status: 'error', message: err.message })
    }
  },

  create: async (req, res) => {
    try {
      const data = await models[model].create(req.body)
      res.status(201).send({ status: 'success', message: message + ' creada!' })
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
        .send({ status: 'success', message: message + ' actualizada!' })
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
        .send({ status: 'success', message: message + ' eliminada!' })
    } catch (err) {
      res.status(400).send({ status: 'error', message: err.message })
    }
  },
}
