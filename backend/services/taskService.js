const { task,projet,user  } = require("../models");

const createTask = async (taskData) => {
  return await task.create(taskData);
};


const changeTaskStatus = async (taskId, status) => {
  const taskToUpdate = await task.findByPk(taskId);
  
  if (!taskToUpdate) {
    throw new Error("NOT_FOUND");
  }

  taskToUpdate.status = status
  await taskToUpdate.save();

  return taskToUpdate;
};

async function getTasksByProjectId(projectId, userId) {
  try {
    // Vérifier si le projet existe et si l'utilisateur est autorisé
    const project = await projet.findByPk(projectId, {
      include: [
        { model: user, as: "client", attributes: ["id", "firstName", "lastName"] },
        { model: user, as: "manager", attributes: ["id", "firstName", "lastName"] }
      ]
    });

    if (!project) {
      throw { status: 404, message: "Projet introuvable" };
    }

    // Vérifier que l'utilisateur est soit le client, soit le manager
    if (project.clientId !== userId && project.managerId !== userId) {
      throw { status: 403, message: "Accès interdit à ce projet" };
    }

    // Récupérer les tâches associées
    return await task.findAll({
      where: { projectId },
      
    });

  } catch (err) {
    if (err.status) throw err; // Erreur volontaire (403 ou 404)
    throw { status: 500, message: "Erreur lors de la récupération des tâches : " + err.message };
  }
}

module.exports = {
  createTask,
  changeTaskStatus,
  getTasksByProjectId
};
