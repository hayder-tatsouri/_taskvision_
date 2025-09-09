const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middlewares/authMiddlewares');
const authorizeRoles = require('../middlewares/authorizeRoles');
const ROLES = require('../constants/roles');

/**
 * @swagger
 * /project/createProject:
 *   post:
 *     summary: Create a new project
 *     security:
 *       - bearerAuth: []
 *     tags: [Project]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: AI Research Project
 *               description:
 *                 type: string
 *                 example: This project focuses on AI-based solutions.
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: 2025-09-01
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: 2025-12-31
 *               deadline:
 *                 type: string
 *                 format: date
 *                 example: 2025-11-30
 *               status:
 *                 type: string
 *                 example: ongoing
 *               clientId:
 *                 type: integer
 *                 example: 2
 *               managerId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Project created successfully
 *       403:
 *         description: Forbidden - Only admins can create projects
 */

/**
 * @swagger
 * /project/projects:
 *   get:
 *     summary: Afficher tous les projets
 *     security:
 *       - bearerAuth: []
 *     tags: [Project]
 *     responses:
 *       200:
 *         description: Liste de tous les projets
 *       403:
 *         description: Accès refusé - réservé aux administrateurs
 */
router.post('/createProject', authMiddleware.verifyToken, authorizeRoles.authorizeRoles(ROLES.ADMIN), projectController.createProject);

router.get('/projects', authMiddleware.verifyToken, authorizeRoles.authorizeRoles(ROLES.ADMIN), projectController.viewAllProjects);

/**
 * @swagger
 * /project/{id}:
 *   get:
 *     summary: Récupérer un projet par ID
 *     security:
 *       - bearerAuth: []
 *     tags: [Project]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du projet
 *     responses:
 *       200:
 *         description: Projet trouvé
 *       404:
 *         description: Projet non trouvé
 *       403:
 *         description: Accès refusé - réservé aux administrateurs
 */
router.get('/:id',authMiddleware.verifyToken,projectController.getProject
);

module.exports = router;