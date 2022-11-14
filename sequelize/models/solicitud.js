const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  sequelize.define('solicitud', {
  	id: {
  	  allowNull : false,
  	  autoIncrement: true,
  	  primaryKey: true,
  	  type: DataTypes.INTEGER,
  	},
    tipo: {
       type: DataTypes.STRING,
  	   allowNull: false
  	},
  	fecha: {
        type: DataTypes.DATEONLY,
  	    allowNull: false
    },
  	primeraVez: {
  		type: DataTypes.BOOLEAN,
  	    allowNull: false,
  	},
  	terceraOportunidad: {
  		type: DataTypes.BOOLEAN,
  	    allowNull: false,
  	},
  	aproboDosParciales: {
  		type: DataTypes.BOOLEAN,
  	    allowNull: false,
  	},
  	comprobante: {
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