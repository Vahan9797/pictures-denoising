'use strict';
export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Image', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      img_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'img_id'
        }
      }
    });
  },
  down: (queryInterface/*, Sequelize*/) => queryInterface.dropTable('Image')
};