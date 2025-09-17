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

const getProject = async (id, userId) => {
  const project = await projet.findByPk(id, {
    include: [
      { model: user, as: "client", attributes: ["id", "firstName", "lastName"] },
      { model: user, as: "manager", attributes: ["id", "firstName", "lastName"] }
    ]
  });

  if (!project) return null;

  if (project.clientId !== userId && project.managerId !== userId) {
    throw new Error("Unauthorized access");
  }

  return project;
};


module.exports = {
  createProject,
  viewAllProjects,
  getProject
};
