const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  sequelize.define('alumno', {
  	id: {
  	  allowNull : false,
  	  autoIncrement: true,
  	  primaryKey: true,
  	  type: DataTypes.INTEGER,
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
  	cuatrimestre: {
  		type: DataTypes.INTEGER,
  	    allowNull: false
  	},
  	carrera: {
  		type: DataTypes.STRING,
  	    allowNull: false
  	},
  	matricula: {
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