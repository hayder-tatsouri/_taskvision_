const { projet } = require("../models");

const createProject = async (projectData) => {

  return await projet.create(projectData);
};

const viewAllProjects = async () => {
  return await projet.findAll();
};

const getProject = async (id) => {
  return await projet.findByPk(id);
};



module.exports = {
  createProject,
  viewAllProjects,
  getProject
};
