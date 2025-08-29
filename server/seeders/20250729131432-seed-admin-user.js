'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('admin@123', 10);

    await queryInterface.bulkInsert('users', [{
      id: require('uuid').v4(),
      first_name: 'Admin',
      last_name: 'User',
      email: 'admin@example.com',
      phone_number: '+916381181789',
      password: hashedPassword,
      role: 'admin',
      status: 'active',
      application_status: 'pending',
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', { email: 'admin@example.com' }, {});
  }
};
