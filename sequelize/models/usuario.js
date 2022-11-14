const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  sequelize.define('usuario', {
  	id: {
  	  allowNull : false,
  	  autoIncrement: true,
  	  primaryKey: true,
  	  type: DataTypes.INTEGER,
  	},
  	usuario: {
  		type: DataTypes.STRING,
  	    allowNull: false
  	},
  	correo: {
  		type: DataTypes.STRING,
  	    allowNull: false
  	},
  	rol: {
  		type: DataTypes.STRING,
  	    allowNull: false
  	},
  	hash: {
  		type: DataTypes.STRING,
  	    allowNull: false
  	},
  	salt: {
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