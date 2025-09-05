const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const comment = sequelize.define('comment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    commentDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, 
    },

  });
  return comment;
};