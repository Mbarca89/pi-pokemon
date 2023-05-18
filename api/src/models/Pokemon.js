const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey:true
    },
    pokeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    attack: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    defense: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    speed: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    height: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: '00000000-0000-0000-0000-000000000001',
      references: {
        model: 'users',
        key: 'id',
      },
    },
  },{ timestamps: false });
};
