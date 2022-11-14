function applyAssociation(sequelize) {
  const { alumno, profesor, solicitud, tutor, usuario } = sequelize.models

  usuario.hasOne(alumno, {
    foreignKey: {
      allowNull: false,
      onDelete: 'restrict',
      onUpdate: 'restrict',
    },
  })
  alumno.belongsTo(usuario)

  usuario.hasOne(profesor, {
    foreigkey: {
      allowNull: false,
      onDelete: 'restrict',
      onUpdate: 'restrict',
    },
  })
  profesor.belongsTo(usuario)

  alumno.hasMany(solicitud, {
    foreigKey: {
      allowNull: false,
      onDelete: 'restrict',
      onUpdate: 'restrict',
    },
  })
  solicitud.belongsTo(alumno)

  tutor.hasMany(alumno, {
    foreigKey: {
      allowNull: false,
      onDelete: 'restrict',
      onUpdate: 'restrict',
    },
  })
  alumno.belongsTo(tutor)

  profesor.belongsToMany(alumno, { through: 'AlumnoProfesor' })
  alumno.belongsToMany(profesor, { through: 'AlumnoProfesor' })
}

module.exports = { applyAssociation }
