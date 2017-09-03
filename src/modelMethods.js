'use strict'

const {
  findAndCountProjection
} = require('./utils')

const Trigger = require('./Trigger')

module.exports = {
  findAndCountEstimateAll,
  addTrigger
}

function findAndCountEstimateAll (query) {
  const { where, limit } = query

  if (!limit) throw new Error('The "limit" property is mandatory for method "findAndCountEstimateAll".')

  return Promise.all([
    this.countEstimate(where),
    this.findAll(query)
  ])
  .then(findAndCountProjection)
}

function addTrigger (procedure, options) {
  const Model = this
  const trigger = Trigger.of(Model, procedure, options)
  return trigger.create()
}
