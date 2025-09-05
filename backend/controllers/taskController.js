const { task, projet ,comment , user} = require('../models'); // importe les modèles
// Méthode pour récupérer une tâche avec son projet : afficher le titre du projet

const taskService = require("../services/taskService");

const addTask = async (req, res) => {
  try {
    const { title, description, startDate, endDate, status, projectId } = req.body;

    const newTask = await taskService.createTask({
      title,
      description,
      startDate,
      endDate,
      status,
      projectId
    });

    res.status(201).json({ message: "Tâche ajoutée avec succès", task: newTask });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'ajout de la tâche", error: error.message });
  }
};


const changeTaskStatus = async (req, res) => {
  const { id } = req.params; // id de la tâche
  const { status } = req.body;

  try {
    const updatedTask = await taskService.changeTaskStatus(id, status);

    res.status(200).json({
      message: "Statut mis à jour",
      task: updatedTask
    });

  } catch (error) {
    if (error.message === "NOT_FOUND") {
      return res.status(404).json({ message: "Tâche non trouvée" });
    }
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

async function getTasksByProject(req, res) {
  try {
    const { projectId } = req.params; // récupère l’id du projet depuis l’URL
    const tasks = await taskService.getTasksByProjectId(projectId);

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: 'No tasks found for this project' });
    }

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}




// Export des méthodes
module.exports = { 
  addTask,
  changeTaskStatus,
  getTasksByProject
  };
