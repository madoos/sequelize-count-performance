'use strict'

const _Sequelize = require('sequelize')

const {
  wrap
} = require('../')
const Sequelize = wrap(_Sequelize)

const {
  database,
  username,
  password,
  options
} = require('./parameters.json')

const {
  table,
  schema,
  schemaOptions,
  createLargeTable
} = require('./util')

example()

async function example () {
  const db = new Sequelize(database, username, password, options)
  const Items = db.define(table, schema, schemaOptions)
  const ItemsCounter = db.define('items_counter', { count: _Sequelize.INTEGER }, schemaOptions)
  await db.sync()
  await db.query(createLargeTable)

  const triggerFunction = await db.createTriggerFunction({
    target: ItemsCounter,
    triggerFunctionName: 'trigger_function',
    functionParams: [ {type: 'trigger_function_params'} ],
    actions: []
  })

  const trigger = await Items.addTrigger(triggerFunction, {
    triggerName: 'trigger_name',
    eventType: 'after',
    fireOnSpec: ['insert'],
    options: ['FOR EACH ROW']
  })

  const counter = {
    statCollector: await Items.countAllFromStatCollector(),
    VACUUMANALYZE: await Items.countAllFromVACUUMANALYZE(),
    BlockSizeAndTuplesPerPage: await Items.countAllFromBlockSizeAndTuplesPerPage(),
    getOId: await Items._getOId(),
    countEstimate: await Items.countEstimate({
      s: {
        $like: 'b238a7da37737e15773bc6ce7961d6a9'
      }
    }),
    models: await Items.findAndCountEstimateAll({
      where: {
        s: {
          $like: 'b238a7da37737e15773bc6ce7961d6a9'
        }
      },
      limit: 1
    }),
    trigger
  }

  return counter
}
