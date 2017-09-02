'use strict'

const proxy = require('./src/proxy')

module.exports = function performanceCount (sequelize) {
  proxy.extendInstance(sequelize)
  proxy.redefineMethods(sequelize)
  return sequelize
}
