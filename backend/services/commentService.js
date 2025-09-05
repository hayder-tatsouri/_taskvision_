const { comment,task,user } = require("../models");

const addComment = async (taskId, userId, content, commentDate) => {
  return await comment.create({
    content,
    taskId,
    userId,
    commentDate
  });
};


const updateComment = async (commentId, userId, content) => {
  const commentToUpdate = await comment.findByPk(commentId);
  
  if (!commentToUpdate) {
    throw new Error("NOT_FOUND");
  }

  if (commentToUpdate.userId !== parseInt(userId)) {
    throw new Error("FORBIDDEN");
  }

  commentToUpdate.content = content;
  await commentToUpdate.save();

  return commentToUpdate;
};

const getCommentsForTask = async (taskId) => {
  const taskWithComments = await task.findByPk(taskId, {
    include: [
      {
        model: comment,
        as: 'comments',
        include: [
          {
            model: user,
            as: 'user',
            attributes: ['id', 'firstName', 'lastName', 'email']
          }
        ]
      }
    ]
  });

  if (!taskWithComments) {
    throw new Error("NOT_FOUND");
  }

  return taskWithComments.comments;
};




module.exports = {
  addComment,
  updateComment,
  getCommentsForTask
};
