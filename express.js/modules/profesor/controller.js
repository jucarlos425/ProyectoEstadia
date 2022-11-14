const { models } = require('../../sequelize')

module.exports = {
  getAll: async (req, res) => {
  	try {
  	  const data = await models[model].findAll({
  	  	where: {
  	  	  status: true,
  	  	},
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
  try{
  	const data = await models[model].create(req.body)
  	res.status(201).send({ status: 'success', message: message + 'creado!' })
  } catch (err) {
  	res.status(400).send({ status: 'error', message: err.message })
  }
},

update: async (req, res) => {
  try {
  	const data = await models[model].create(req.body, {
  	 where: {
  	   id: req.body.id,
  	 },
   })
   res  	
      .status(200)
      .send({ status: 'success', message: message + 'actualizado!' })
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
  	  },
     )
     res
       .status(200)
       .send({ status: 'success', message + ' eliminado!' })
   } catch(err) {
   	 res.status(400).send({ status: 'error', message: err.message })
   }
 },
}