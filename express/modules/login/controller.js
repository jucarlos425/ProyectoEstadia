const { checkPassword, generateToken } = require('./helper')
const { models } = require('../../../sequelize')

const model = 'usuario'

module.exports = {
  login: async (req, res) => {
    try {
      const data = await models[model].findOne({
        where: {
          usuario: req.body.username,
          status: true,
        },
      })

      if (!checkPassword(req.body.password, data.salt, data.hash)) {
        throw new Error('Usuario y/o contraseña incorrectos')
      }
      let profile = null
      let level = 1

      switch (data.role) {
        case 2:
          profile = await models.alumno.findOne({
            where: {
              id: data.usuarioId,
            },
          })

          level = 2
          break

        case 3:
          profile = await models.profesor.findOne({
            where: {
              id: data.usuarioId,
            },
          })

          level = 3
          break

        default:
          break
      }
      res.status(200).send({
        status: 'success',
        message: 'Acceso concedido!',
        access_token: generateToken({
          id: data.id,
          name: data.name,
          user: data.user,
          role: data.role,
          profile,
          level,
        }),
      })
    } catch (err) {
      res.status(400).send({ status: 'error', message: 'Acceso denegado' })
    }
  },
}
