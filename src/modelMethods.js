'use strict'

const {
  findAndCountProjection
} = require('./utils')

module.exports = {
  findAndCountEstimateAll (query) {
    const { where, limit } = query

    if (!limit) throw new Error('The "limit" property is mandatory for method "findAndCountEstimateAll".')

    return Promise.all([
      this.countEstimate(where),
      this.findAll(query)
    ])
    .then(findAndCountProjection)
  }
}
