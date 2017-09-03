'use strict'

class TriggerFunction {
  constructor (Model, options) {
    this.Model = Model
    this.Model.triggerFunctions = []
    this.options = options
    this.triggerFunctionName = this.options.triggerFunctionName
    this.functionParams = this.options.functionParams
  }

  static of (...args) {
    return new TriggerFunction(...args)
  }
}

module.exports = TriggerFunction
