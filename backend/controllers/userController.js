
const userService = require("../services/userService");

// Méthode pour afficher tous les utilisateurs
const getAllUsers = async (req, res) => {
  try {
    
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  }catch (error) {
  res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs', error: error.message });
}
};

const createAccount = async (req, res) => {
  try {
    const newUser = await userService.createAccount(req.body);
    res.status(201).json({ message: "Utilisateur ajouté", user: newUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUsersOfProject = async (req, res) => {
  const projectId = req.params.id;

  try {
    const project = await userService.getUsersOfProject(projectId);
    res.json(project);
  } catch (error) {
    if (error.message === "NOT_FOUND") {
      return res.status(404).json({ message: "Projet non trouvé" });
    }
    res.status(500).json({ error: error.message });
  }
};

const getUserProjects = async (req, res) => {
  const userId = parseInt(req.user.id);  
  
  try {
    const projects = await userService.getUserProjects(userId);
    res.status(200).json(projects);
  } catch (error) {
    if (error.message === "NOT_FOUND") {
      return res.status(404).json({ message: "Aucun projet trouvé pour cet utilisateur" });
    }
    res.status(500).json({ error: "Erreur serveur" });
  }
};
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await userService.deleteUser(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};




// Export des méthodes
module.exports = {
   getUsersOfProject,
   getUserProjects,
   getAllUsers,
   createAccount,
    deleteUser
   };

