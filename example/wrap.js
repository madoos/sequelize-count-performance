'use strict'

const { wrap } = require('../')
const Sequelize = wrap(require('sequelize'))

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

  // fillDb
  await db.query(createLargeTable)
  await db.sync()

  const Items = db.define(table, schema, schemaOptions)

  const counter = {
    statCollector: await Items.countAllFromStatCollector(),
    VACUUMANALYZE: await Items.countAllFromVACUUMANALYZE(),
    BlockSizeAndTuplesPerPage: await Items.countAllFromBlockSizeAndTuplesPerPage(),
    getOId: await Items._getOId(),
    countEstimate: await Items.countEstimate({
      s: {
        $like: 'b238a7da37737e15773bc6ce7961d6a9'
      }
    })
  }

  const estimates = await Items.findAndCountEstimateAll({
    where: {s: {$like: 'b238a7da37737e15773bc6ce7961d6a9'}},
    limit: 1
  })

  await db.removePerformanceCountFunctions()
  return counter
}
