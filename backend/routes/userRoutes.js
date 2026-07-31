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

/**
 * @swagger
 * /user/getUser/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Retrieves a specific user's information by their ID. Requires authentication and admin role.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the user to retrieve
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: User information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 firstName:
 *                   type: string
 *                   example: John
 *                 lastName:
 *                   type: string
 *                   example: Doe
 *                 email:
 *                   type: string
 *                   example: john.doe@example.com
 *                 role:
 *                   type: string
 *                   example: admin
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       403:
 *         description: Forbidden - Admin role required
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get('/getUser/:id', authMiddleware.verifyToken, authorizeRoles.authorizeRoles(ROLES.ADMIN), userController.getUserById);

/**
 * @swagger
 * /user/sendNotification:
 *   post:
 *     summary: Send a notification to a user
 *     description: Sends an email notification to a specific user. Requires authentication and admin role.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - subject
 *               - message
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: The ID of the user to send the notification to
 *                 example: 1
 *               subject:
 *                 type: string
 *                 description: The subject of the notification
 *                 example: "Project Update"
 *               message:
 *                 type: string
 *                 description: The content of the notification
 *                 example: "Your project has been updated with new tasks"
 *     responses:
 *       200:
 *         description: Notification sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Notification sent successfully"
 *       400:
 *         description: Missing required fields (userId, subject, message)
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       403:
 *         description: Forbidden - Admin role required
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error - Failed to send notification
 */
router.post('/sendNotification', authMiddleware.verifyToken, authorizeRoles.authorizeRoles(ROLES.ADMIN), userController.sendNotification);




module.exports = router;