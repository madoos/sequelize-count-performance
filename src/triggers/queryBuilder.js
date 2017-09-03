'use strict'

const {
  props
} = require('ramda')

module.exports = {
  fixExpandTriggerEventSpec
}

function fixExpandTriggerEventSpec (fireOnSpec) {
  return props(fireOnSpec, {
    'insert': 'INSERT',
    'update': 'UPDATE',
    'delete': 'DELETE',
    'truncate': 'TRUNCATE'
  })
}
