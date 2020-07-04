'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Stops', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      stopName: {
        type: Sequelize.STRING
      },
      stopId: {
        type: Sequelize.INTEGER
      },
      stopCode: {
        type: Sequelize.INTEGER
      },
      stopDesc: {
        type: Sequelize.STRING
      },
      stopLat: {
        type: Sequelize.FLOAT
      },
      stopLon: {
        type: Sequelize.FLOAT
      },
      zoneId: {
        type: Sequelize.INTEGER
      },
      wheelchairBoarding: {
        type: Sequelize.BOOLEAN
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Stops');
  }
};