'use strict'

const sequelize = require('sequelize')

module.exports = {
  table: 'items',
  createLargeTable: `CREATE TABLE  IF NOT EXISTS items AS
  SELECT
    (random()*1000000)::integer AS n,
    md5(random()::text) AS s
  FROM
    generate_series(1,1000000);`,
  schema: {
    n: sequelize.INTEGER,
    s: {
      type: sequelize.STRING,
      primaryKey: true
    }
  },
  schemaOptions: {
    timestamps: false
  }
}
