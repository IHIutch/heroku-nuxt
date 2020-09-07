'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Stops', 'categoryScores', {
      type: Sequelize.JSONB,
    })
  },
};
