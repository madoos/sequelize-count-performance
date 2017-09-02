'use strict'

const { database, username, password, options } = require('./parameters.json')
const Sequelize = require('sequelize')

const db = new Sequelize(database, username, password, options)

console.log(db)
