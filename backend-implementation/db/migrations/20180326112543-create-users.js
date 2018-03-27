'use strict';
export default {
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
        type: Sequelize.STRING(30)
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.TEXT
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
        age: { [Sequelize.Op.gt]: 0 }
      }
    }));
  },
  down: (queryInterface/*, Sequelize*/) => queryInterface.dropTable('Users')
};