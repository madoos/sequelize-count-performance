'use strict'

const {
  is
} = require('ramda')

const {
  fixExpandTriggerEventSpec
} = require('./queryBuilder')

module.exports = {
  createTrigger
}

function createTrigger (triggerDescriptor) {
  this.queryInterface.QueryGenerator.expandTriggerEventSpec = fixExpandTriggerEventSpec // fix error in sequelize

  const {
    name,
    target,
    actions,
    emitter,
    eventType,
    fireOnSpec
  } = triggerDescriptor

  const EMITTER_TABLE_NAME = is(String)(emitter) ? this.models[emitter] : emitter.tableName

  const createTriggerQuery = this.queryInterface.QueryGenerator.createTrigger(
    EMITTER_TABLE_NAME,
    name,
    eventType,
    fireOnSpec,
    'function_name',
    [/* {type: 'test', direction: 'direction', name: 'name'} */],
    ['FOR EACH ROW']
  )

  return Promise.resolve(createTriggerQuery)
}
