'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Answer.belongsTo(models.Question, { foreignKey: 'questionId' })
      Answer.belongsTo(models.Stop, { foreignKey: 'stopId' })
    }
  }
  Answer.init(
    {
      value: DataTypes.TEXT,
      questionId: DataTypes.INTEGER,
      stopId: DataTypes.INTEGER,
      sessionId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: 'Answer',
    }
  )
  return Answer
}
