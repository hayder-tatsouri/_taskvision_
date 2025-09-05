const commentService = require("../services/commentService");

const addComment = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { taskId } = req.params; // récupérés depuis l'URL
    const { content, commentDate } = req.body;

    const newComment = await commentService.addComment(taskId, userId, content, commentDate);

    res.status(201).json({
      message: "Commentaire ajouté avec succès",
      comment: newComment
    });
  } catch (error) {
    console.error("Erreur Sequelize:", error);
    res.status(500).json({
      message: "Erreur lors de l'ajout du commentaire",
      error: error.message
    });
  }
};


const updateComment = async (req, res) => {
    const userId = req.user.id; // Récupération de l'ID de l'utilisateur depuis le token
  const { commentId } = req.params;
  const { content } = req.body;

  try {
    const updatedComment = await commentService.updateComment(commentId, userId, content);

    res.status(200).json({
      message: "Commentaire mis à jour avec succès",
      comment: updatedComment
    });

  } catch (error) {
    if (error.message === "NOT_FOUND") {
      return res.status(404).json({ message: "Commentaire non trouvé" });
    }
    if (error.message === "FORBIDDEN") {
      return res.status(403).json({ message: "Accès refusé : vous n'êtes pas l'auteur" });
    }
    res.status(500).json({ message: "Erreur lors de la mise à jour", error: error.message });
  }
};

const getCommentsForTask = async (req, res) => {
  const taskId = req.params.taskId;

  try {
    const comments = await commentService.getCommentsForTask(taskId);
    res.json(comments);
  } catch (error) {
    if (error.message === "NOT_FOUND") {
      return res.status(404).json({ message: "Tâche non trouvée" });
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addComment,
  updateComment,
  getCommentsForTask
};
