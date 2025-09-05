const { task  } = require("../models");

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

async function getTasksByProjectId(projectId) {
  try {
    
    return await task.findAll({
      where: { projectId: projectId }
    });
  } catch (err) {
    throw new Error('Error fetching tasks for project: ' + err.message);
  }
}

module.exports = {
  createTask,
  changeTaskStatus,
  getTasksByProjectId
};
