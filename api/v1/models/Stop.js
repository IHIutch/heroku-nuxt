'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Stop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Stop.hasOne(models.Watcher, { foreignKey: 'stopId', as: 'watcher' })
      Stop.hasMany(models.Answer, { foreignKey: 'stopId', as: 'answers' })
    }
  }
  Stop.init(
    {
      stopName: DataTypes.STRING,
      stopId: DataTypes.INTEGER,
      stopCode: DataTypes.INTEGER,
      stopDesc: DataTypes.TEXT,
      stopLat: DataTypes.FLOAT,
      stopLon: DataTypes.FLOAT,
      zoneId: DataTypes.INTEGER,
      wheelchairBoarding: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Stop',
    }
  )
  return Stop
}
