'use strict'

const { mix } = require('./utils')
const pgFunctions = require('./PGFunctions')
const countStrategies = require('./countStrategies')

class SequelizeCountPerformance {
  constructor (sequelizeInstance) {
    this.sequelize = sequelizeInstance
  }

  static of (...args) {
    return new SequelizeCountPerformance(...args)
  }

  extendInstance () {
    this.sequelize = mix(this.sequelize, pgFunctions)
    return this
  }

  redefineMethods () {
    this._defineProxy()
    return this
  }

  _defineProxy () {
    const __originalDefine = this.sequelize.define
    const sequelize = this.sequelize

    sequelize.define = function (...args) {
      const Model = __originalDefine.apply(sequelize, args)
      return mix(Model, countStrategies)
    }

    return this
  }

  getInstance () {
    return this.sequelize
  }
}

module.exports = SequelizeCountPerformance
