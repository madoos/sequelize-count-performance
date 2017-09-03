'use strict'

const TriggerFunction = require('./TriggerFunction')

module.exports = {
  createTriggerFunction
}

function createTriggerFunction (options) {
  const Model = options.target
  const triggerFunction = TriggerFunction.of(Model, options)
  return Promise.resolve(triggerFunction)
}
