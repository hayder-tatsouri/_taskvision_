const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddlewares');
const authorizeRoles = require('../middlewares/authorizeRoles');
const ROLES = require('../constants/roles');

/**
 * @swagger
 * /task/addTask:
 *   post:
 *     summary: Ajouter une nouvelle tâche
 *     description: Crée une tâche dans un projet. Accessible uniquement aux administrateurs et aux chefs de projet.
 *     security:
 *       - bearerAuth: []
 *     tags: [Task]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Développement API
 *               description:
 *                 type: string
 *                 example: Implémenter les routes CRUD pour la gestion des utilisateurs
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: 2025-08-20
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: 2025-09-05
 *               status:
 *                 type: string
 *                 example: pending
 *               projectId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Tâche créée avec succès
 *       401:
 *         description: Non autorisé
 *       403:
 *         description: Accès refusé (rôle insuffisant)
 */
router.post('/addTask', authMiddleware.verifyToken,authorizeRoles.authorizeRoles(ROLES.ADMIN,ROLES.PROJECT_MANAGER) ,taskController.addTask);
/**
 * @swagger
 * /task/changeTaskStatus/{id}:
 *   put:
 *     summary: Modifier le statut d’une tâche
 *     description: Permet de mettre à jour le statut d'une tâche existante. Accessible aux utilisateurs authentifiés.
 *     security:
 *       - bearerAuth: []
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tâche à modifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: in_progress
 *     responses:
 *       200:
 *         description: Statut de la tâche mis à jour avec succès
 *       404:
 *         description: Tâche non trouvée
 *       401:
 *         description: Non autorisé
 */
router.put('/changeTaskStatus/:id', authMiddleware.verifyToken, taskController.changeTaskStatus);
/**
 * @swagger
 * /task/project/{projectId}/tasks:
 *   get:
 *     summary: Récupérer les tâches d’un projet
 *     description: Récupère toutes les tâches associées à un projet spécifique. Accessible aux utilisateurs authentifiés.
 *     security:
 *       - bearerAuth: []
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du projet dont on veut récupérer les tâches
 *     responses:
 *       200:
 *         description: Liste des tâches du projet
 *       404:
 *         description: Aucune tâche trouvée pour ce projet
 *       401:
 *         description: Non autorisé
 */
router.get('/project/:projectId/tasks', authMiddleware.verifyToken, taskController.getTasksByProject);

module.exports = router;
