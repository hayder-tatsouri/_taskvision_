'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{  // ← 'user' en minuscule
      firstName: 'Admin',
      lastName: 'Admin',
      email: 'admin@example.com',
      password: await bcrypt.hash('password123', 10),
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user', { email: 'admin@example.com' }, {}); // ← aussi en minuscule
  }
};
