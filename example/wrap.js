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

  const adjustCountTrigger = await db.createTrigger({
    name: 'adjust_count_trigger',
    target: ItemsCounter,
    emitter: Items,
    eventType: 'after',
    fireOnSpec: ['insert', 'update'],
    actions: [{
      type: 'insert',
      execute: [{ }],
      action: { }
    }]
  })

  console.log(adjustCountTrigger)
  // await Items.addTrigger(adjustCountTrigger)

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
    })
  }

  return counter
}
