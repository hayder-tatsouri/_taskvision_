require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
  }
);

// Import model factories
const userModel = require('./user');
const projetModel = require('./projet');
const taskModel = require('./task');
const commentModel = require('./comment');

// Initialize models
const user = userModel(sequelize, Sequelize.DataTypes);
const projet = projetModel(sequelize, Sequelize.DataTypes);
const task = taskModel(sequelize, Sequelize.DataTypes);
const comment = commentModel(sequelize, Sequelize.DataTypes);


// Associations:

//entre task et projet
projet.hasMany(task, { foreignKey: 'projectId', as: 'tasks' });
task.belongsTo(projet, { foreignKey: 'projectId', as: 'projet' });
// entre user(client et manager) et projet
user.hasMany(projet, { foreignKey: 'clientId', as: 'projectsClient' });
user.hasMany(projet, { foreignKey: 'managerId', as: 'projectsManager' });
projet.belongsTo(user, { foreignKey: 'clientId', as: 'client' });
projet.belongsTo(user, { foreignKey: 'managerId', as: 'manager' });
//entre comment et user
user.hasMany(comment, { foreignKey: 'userId', as: 'comments' });
comment.belongsTo(user, { foreignKey: 'userId', as: 'user' });
// entre task et comment
task.hasMany(comment, { foreignKey: 'taskId', as: 'comments' });
comment.belongsTo(task, { foreignKey: 'taskId', as: 'task' });

module.exports = {
  sequelize,
  user,
  projet,
  task,
  comment,

};
