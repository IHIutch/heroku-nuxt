'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Answers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      value: {
        type: Sequelize.TEXT,
      },
      questionId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Questions',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      stopId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Stops',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      sessionId: {
        type: Sequelize.UUID,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Answers')
  },
}
