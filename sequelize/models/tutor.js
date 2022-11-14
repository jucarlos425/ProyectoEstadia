const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  sequelize.define('tutor', {
  	id: {
  	  allowNull : false,
  	  autoIncrement: true,
  	  primaryKey: true,
  	  type: DataTypes.INTEGER,
  	},
  	carrera: {
  		type: DataTypes.STRING,
  	    allowNull: false
  	},
  	puesto: {
  	    type: DataTypes.STRING,
  	    allowNull: false
  	},
  	correo: {
  	    type: DataTypes.STRING,
  	    allowNull: false
  	},
  	nombre: {
  	    type: DataTypes.STRING,
  	    allowNull: false
  	},
  	apellidoPaterno: {
  	    type: DataTypes.STRING,
  	    allowNull: false
  	},
  	apellidoMaterno: {
  		type: DataTypes.STRING,
  	    allowNull: false
  	},
  	estatus: {
  		type: DataTypes.BOOLEAN,
  	    allowNull: false,
  	    defaultValue: true
  	}
  })
}