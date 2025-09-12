const { projet, user } = require("../models");

const createProject = async (projectData) => {
  return await projet.create(projectData);
};

const viewAllProjects = async () => {
  return await projet.findAll({
    include: [
      { model: user, as: "client", attributes: ["id", "firstName", "lastName"] },
      { model: user, as: "manager", attributes: ["id",  "firstName", "lastName"] }
    ]
  });
};

const getProject = async (id) => {
  return await projet.findByPk(id, {
    include: [
      { model: user, as: "client", attributes: ["id", "firstName", "lastName"] },
      { model: user, as: "manager", attributes: ["id", "firstName", "lastName"] }
    ]
  });
};

module.exports = {
  createProject,
  viewAllProjects,
  getProject
};
