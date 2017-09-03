'use strict'
const {
  fixExpandTriggerEventSpec
} = require('./queryBuilder')

class Trigger {
  constructor (Model, triggerFunction, options) {
    this.triggerName = options.triggerName
    this.emitter = Model.tableName
    this.sequelize = Model.sequelize
    this.Model = Model
    this.Model.triggers = []
    this.triggerFunction = triggerFunction
    this.options = options
    this.QueryGenerator = Model.QueryGenerator
    // Fix sequelize error
    this.QueryGenerator.expandTriggerEventSpec = fixExpandTriggerEventSpec
  }

  static of (...args) {
    return new Trigger(...args)
  }

  create () {
    const createQuery = this.QueryGenerator.createTrigger(
      this.emitter,
      this.options.triggerName,
      this.options.eventType,
      this.options.fireOnSpec,
      this.triggerFunction.triggerFunctionName,
      this.triggerFunction.functionParams,
      this.options.options
    )

    return this.sequelize.query(createQuery).then(() => {
      this.Model.triggers.push(this)
      return this
    })
  }

  drop () {
    const dropQuery = this.QueryGenerator.dropTrigger(this.emitter, this.triggerName)
    return this.sequelize.query(dropQuery)
  }
}

module.exports = Trigger
