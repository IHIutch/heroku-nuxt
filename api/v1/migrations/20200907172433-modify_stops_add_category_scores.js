'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Stops', 'categoryScores', {
      type: Sequelize.JSONB,
    })
  },
}
