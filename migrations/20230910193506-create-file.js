'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('files', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING
      },
      location: {
        allowNull: false,
        type: Sequelize.STRING
      },
      sede: {
        allowNull: false,
        type: Sequelize.STRING
      },
      activoFijo: {
        allowNull: false,
        type: Sequelize.STRING
      },
      serie: {
        allowNull: false,
        type: Sequelize.STRING
      },
      calibrationDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      nextCalibrationDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      filePath: {
        allowNull: false,
        type: Sequelize.STRING
      },
      customerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model:'customers',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      deviceId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model:'devices',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      certificateTypeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model:'certificateTypes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('files');
  }
};