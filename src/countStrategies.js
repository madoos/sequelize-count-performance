'use strict'

const {
  path
} = require('ramda')

module.exports = {
  countAllFromStatCollector () {
    return this.sequelize
      .query(`SELECT n_live_tup FROM pg_stat_all_tables WHERE relname = '${this.tableName}';`)
      .then(path([0, 0, 'n_live_tup']))
      .then(Number)
  },

  countAllFromVACUUMANALYZE () {
    return this.sequelize
      .query(`SELECT reltuples FROM pg_class WHERE relname = '${this.tableName}';`)
      .then(path([0, 0, 'reltuples']))
      .then(Number)
  },

  countAllFromBlockSizeAndTuplesPerPage () {
    return this._getOId()
      .then((oid) => {
        return this.sequelize
          .query(`SELECT (reltuples/relpages) * (pg_relation_size(${oid}) / (current_setting('block_size')::integer)) FROM pg_class where relname = '${this.tableName}';`)
          .then(path([0, 0, '?column?']))
          .then(Number)
      })
  },

  countEstimate (where) {
    const whereQuery = this.QueryGenerator.whereQuery(where)
    const query = `SELECT count_estimate('SELECT 1 FROM "${this.tableName}" ${whereQuery}');`
    return this.sequelize
      .query(query)
      .then(path([0, 0, 'count_estimate']))
  },

  _getOId () {
    return this.sequelize
      .query(`select oid from pg_class WHERE relname = '${this.tableName}';`)
      .then(path([0, 0, 'oid']))
      .then(Number)
  }
}
