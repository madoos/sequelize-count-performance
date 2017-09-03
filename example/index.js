'use strict'

const Sequelize = require('sequelize')
const sequelizePerformanceCount = require('../')

const {
  database,
  username,
  password,
  options
} = require('./parameters.json')

const {
  table,
  schema,
  createLargeTable
} = require('./util')

example()

async function example (params) {
  const sequelize = new Sequelize(database, username, password, options)

  // fillDb
  await sequelize.query(createLargeTable)

  const db = sequelizePerformanceCount(sequelize)
  await db.sync()

  const Items = db.define(table, schema)

  const counter = {
    statCollector: await Items.countAllFromStatCollector(),
    VACUUMANALYZE: await Items.countAllFromVACUUMANALYZE(),
    BlockSizeAndTuplesPerPage: await Items.countAllFromBlockSizeAndTuplesPerPage(),
    getOId: await Items._getOId(),
    countEstimate: await Items.countEstimate()
  }

  return counter
}
