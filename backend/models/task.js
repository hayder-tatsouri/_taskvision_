const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const task = sequelize.define('task', {
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
   
    status: {
      type: DataTypes.STRING,
    },
    
    
  });

  return task;
};