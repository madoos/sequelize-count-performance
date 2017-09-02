'use strict'

const {
  database,
  username,
  password,
  options
} = require('./parameters.json')

const Sequelize = require('sequelize')
const sequelizePerformanceCount = require('../')

const sequelize = new Sequelize(database, username, password, options)
const db = sequelizePerformanceCount(sequelize)

const User = db.define('user', {
  username: Sequelize.STRING,
  birthday: Sequelize.DATE
})

User.estimateCount({
  username: 'Jhon',
  test: false
}).then((data) => {
  console.log(data)
})
