const projectService = require("../services/projectService");

const createProject = async (req, res) => {
  try {
    const { title, description, startDate, endDate, deadline, status, clientId, managerId } = req.body;

    const newProject = await projectService.createProject({
      title,
      description,
      startDate,
      endDate,
      deadline,
      status,
      clientId,
      managerId
    });

    res.status(201).json({ message: "Projet ajouté", project: newProject });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'ajout", error: error.message });
  }
};

const viewAllProjects = async (req, res) => {
  try {
    const projets = await projectService.viewAllProjects();
    res.status(200).json(projets);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des projets", error: error.message });
  }
};
module.exports = {
  createProject,
  viewAllProjects
};
