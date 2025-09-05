const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middlewares/authMiddlewares');

/**
 * @swagger
 * /comment/addComment/{taskId}:
 *   post:
 *     summary: Add a comment to a task
 *     security: 
 *       - bearerAuth: []
 *     tags: [Comment]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the task to add a comment to
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: This is a comment on the task.
 *     responses:
 *       201:
 *         description: Comment added successfully
 */
router.post('/addComment/:taskId', authMiddleware.verifyToken, commentController.addComment);
/**
 * @swagger
 * /comment/updateComment/{commentId}:
 *   put:
 *     summary: Update a comment
 *     security: 
 *       - bearerAuth: []
 *     tags: [Comment]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the comment to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: This is an updated comment.
 *     responses:
 *       200:
 *         description: Comment updated successfully
 */
router.put('/updateComment/:commentId', authMiddleware.verifyToken, commentController.updateComment);
/**
 * @swagger
 * /comment/getComments/{taskId}:
 *   get:
 *     summary: Get all comments for a specific task
 *     security:
 *       - bearerAuth: []
 *     tags: [Comment]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the task to show comments for
 *     responses:
 *       200:
 *         description: List of comments for the task
 *       404:
 *         description: Task not found or no comments
 */

router.get('/getComments/:taskId', authMiddleware.verifyToken, commentController.getCommentsForTask);
module.exports = router;