
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Projet = sequelize.define('projet', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    startDate: {
      type: DataTypes.DATE,
    },
    endDate: {
      type: DataTypes.DATE,
    },
    deadline: {
      type: DataTypes.DATE,
    },
    status: {
      type: DataTypes.STRING,
    },
    
  });

  return Projet;
};