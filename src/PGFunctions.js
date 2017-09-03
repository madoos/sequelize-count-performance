'use strict'

const {
  promiseSerial
} = require('./utils')

const COUNT_ESTIMATE = 'count_estimate(query text)'

module.exports = {
  __addPerformanceCountFunctions,
  removePerformanceCountFunctions
}

function __addPerformanceCountFunctions () {
  return promiseSerial(
    () => this.query(
    `CREATE OR REPLACE FUNCTION ${COUNT_ESTIMATE} RETURNS integer AS $$
      DECLARE
        rec   record;
        rows  integer;
      BEGIN
        FOR rec IN EXECUTE 'EXPLAIN ' || query LOOP
          rows := substring(rec."QUERY PLAN" FROM ' rows=([[:digit:]]+)');
          EXIT WHEN rows IS NOT NULL;
        END LOOP;
        RETURN rows;
      END;
      $$ LANGUAGE plpgsql VOLATILE STRICT;`)
  )
}

function removePerformanceCountFunctions () {
  return promiseSerial(
      () => this.query(`DROP FUNCTION IF EXISTS ${COUNT_ESTIMATE};`)
    )
}
