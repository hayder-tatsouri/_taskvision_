const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddlewares');
const authorizeRoles = require('../middlewares/authorizeRoles');
const ROLES = require('../constants/roles');

/** * @swagger
 * /user/users:
 *   get:
 *     summary: Get all users
 *     security: 
 *      - bearerAuth: []
 *     tags: [User]
 *     responses:
 *       200:
 *         description: List of users
 *       401:
 *         description: Unauthorized
 */
router.get('/users', authMiddleware.verifyToken, authorizeRoles.authorizeRoles(ROLES.ADMIN), userController.getAllUsers);

/**
 * @swagger
 * /user/createAccount:
 *   post:
 *     summary: Create a new user account
 *     security: 
 *       - bearerAuth: []
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               firstName:
 *                 type: string
 *                 example: John
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: mySecret123
 *               role:
 *                 type: string
 *                 example: admin
 *     responses:
 *       201:
 *         description: User account created successfully
 */

router.post('/createAccount', authMiddleware.verifyToken, authorizeRoles.authorizeRoles(ROLES.ADMIN), userController.createAccount);
/**
 * @swagger
 * /user/{id}/users:
 *   get:
 *     summary: Get users of a specific project
 *     security: 
 *       - bearerAuth: []
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the project
 *     responses:
 *       200:
 *         description: List of users associated with the project
 *       404:
 *         description: Project not found
 */
router.get('/:id/users', authMiddleware.verifyToken, userController.getUsersOfProject);
/**
 * @swagger
 * /user/getUserProjects:
 *   get:
 *     summary: Get projects associated with the authenticated user
 *     security: 
 *       - bearerAuth: []
 *     tags: [User]
 *     responses:
 *       200:
 *         description: List of projects associated with the user
 *       404:
 *         description: No projects found for the user
 */
router.get('/getUserProjects', authMiddleware.verifyToken, userController.getUserProjects);

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Supprimer un utilisateur par ID
 *     description: Supprime définitivement un utilisateur du système. Nécessite un token d'authentification valide.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []   # Active l'auth via JWT
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de l'utilisateur à supprimer
 *         required: true
 *         schema:
 *           type: integer
 *           example: 12
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Utilisateur supprimé avec succès
 *       401:
 *         description: Token manquant ou invalide
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */

router.delete('/deleteUser/:id', authMiddleware.verifyToken, authorizeRoles.authorizeRoles(ROLES.ADMIN), userController.deleteUser);






module.exports = router;