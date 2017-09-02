/* jshint mocha:true */

'use strict'

const sequelizeCountPerformance = require('../')

const {
  expect
} = require('chai')

describe('Import module', function () {
  it('should import module', requireModule)
})

function requireModule() {
  expect(sequelizeCountPerformance).to.be.a('function')
}
