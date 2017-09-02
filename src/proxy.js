'use strict'

const { mix } = require('./utils')
const countMixing = require('./mixings/count')
const dbFunctions = require('./dbFunctions')

module.exports = {
  extendInstance,
  redefineMethods
}

function extendInstance (sequelize) {
  return mix(sequelize, dbFunctions)
}

function redefineMethods (sequelize) {
  _define(sequelize)
  return sequelize
}

function _define (sequelize) {
  const __originalDefine = sequelize.define
  sequelize.define = function (...args) {
    const Model = __originalDefine.apply(sequelize, args)
    return mix(Model, countMixing)
  }
}

