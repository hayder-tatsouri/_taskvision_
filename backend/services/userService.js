const bcrypt = require('bcrypt');
const { user ,projet } = require('../models');
const { Op } = require('sequelize');

const getAllUsers = async () => {
    const users = await user.findAll();
    return users;
  };

const createAccount = async ({ lastName, firstName, email, password, role }) => {
  // Vérifier que le rôle est valide
  const allowedRoles = ["Admin", "Project Manager", "Client"];
  if (!allowedRoles.includes(role)) {
    throw new Error(`Le rôle doit être l'un des suivants : ${allowedRoles.join(", ")}`);
  }

  // Vérifier si l'email existe déjà
  const existingUser = await user.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("Cet email est déjà utilisé");
  }

  // Génération du hash
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Création de l'utilisateur
  const newUser = await user.create({
    lastName,
    firstName,
    email,
    password: hashedPassword,
    role
  });

  // Retirer le mot de passe de la réponse
  const { password: _, ...userWithoutPassword } = newUser.get({ plain: true });

  return userWithoutPassword;
};

const getUsersOfProject = async (projectId) => {
  const project = await projet.findByPk(projectId, {
    include: [
      { model: user, as: 'client', attributes: ['firstName', 'lastName'] },
      { model: user, as: 'manager', attributes: ['firstName', 'lastName'] }
    ]
  });

  if (!project) {
    throw new Error("NOT_FOUND");
  }

  return project;
};



const getUserProjects = async (userId) => {
  const projects = await projet.findAll({
    where: {
      [Op.or]: [
        { clientId: userId },
        { managerId: userId }
      ]
    }
  });

  if (!projects || projects.length === 0) {
    throw new Error("NOT_FOUND");
  }

  return projects;
};


module.exports = {
  getAllUsers,
  createAccount,
  getUsersOfProject,
  getUserProjects
};
