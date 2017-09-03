'use strict'

const { mix } = require('./utils')
const pgFunctions = require('./PGFunctions')
const sequelizeMethods = require('./sequelizeMethods')
const countStrategies = require('./countStrategies')
const modelMethods = require('./modelMethods')

class SequelizeCountPerformance {
  constructor (sequelizeInstance) {
    this.sequelize = sequelizeInstance
  }

  static of (...args) {
    return new SequelizeCountPerformance(...args)
  }

  extendInstance () {
    this.sequelize = mix(this.sequelize, pgFunctions, sequelizeMethods)
    return this
  }

  redefineMethods () {
    this._define()._sync()
    return this
  }

  _define () {
    const __originalDefine = this.sequelize.define
    const sequelize = this.sequelize

    sequelize.define = function (...args) {
      const Model = __originalDefine.apply(sequelize, args)
      return mix(Model, countStrategies, modelMethods)
    }

    return this
  }

  _sync () {
    const __originalSync = this.sequelize.sync
    const { __addPerformanceCountFunctions } = pgFunctions
    const sequelize = this.sequelize

    sequelize.sync = function (...args) {
      return __addPerformanceCountFunctions
             .apply(sequelize, args)
             .then(() => __originalSync.apply(sequelize, args))
    }
    return this
  }

  getInstance () {
    return this.sequelize
  }
}

module.exports = SequelizeCountPerformance
