'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        allowNull: false,
        unique: true,
        type: Sequelize.VARCHAR
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      password_digest: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      age: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
    .then(() => queryInterface.addConstraint('Users', ['age'], {
      type: 'check',
      where: {
        age: { [Sequelize.Op.gt]: 1 }
      }
    }));
  },
  down: (queryInterface/*, Sequelize*/) => queryInterface.dropTable('Users')
};