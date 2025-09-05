const { projet } = require("../models");

const createProject = async (projectData) => {

  return await projet.create(projectData);
};

const viewAllProjects = async () => {
  return await projet.findAll();
};





module.exports = {
  createProject,
  viewAllProjects
};
