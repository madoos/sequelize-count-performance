'use strict'

const SequelizeCountPerformance = require('./src/SequelizeCountPerformance')

function sequelizeCountPerformance (sequelize) {
  return SequelizeCountPerformance
          .of(sequelize)
          .extendInstance()
          .redefineMethods()
          .getInstance()
}

function wrap (Sequelize) {
  return function SequelizeWrapped (...args) {
    return sequelizeCountPerformance(new Sequelize(...args))
  }
}

sequelizeCountPerformance.wrap = wrap

module.exports = sequelizeCountPerformance
