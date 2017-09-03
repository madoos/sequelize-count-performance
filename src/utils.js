'use strict'

const {
  replace,
  partial,
  pipe,
  prop,
  curry,
  map
} = require('ramda')

function mix (target, ...objs) {
  objs.forEach(o => {
    Object.keys(o).forEach(k => {
      target[k] = o[k]
    })
  })
  return target
}

function promiseSerial (...funcs) {
  return funcs.reduce((promise, func) => {
    return promise.then(result => func().then(Array.prototype.concat.bind(result)))
  }, Promise.resolve([]))
}

const projection = curry(function (descriptor, data) {
  return map((fn) => fn(data), descriptor)
})

module.exports = {
  mix,
  promiseSerial,
  projection,
  escapeSingleQuote: partial(replace, [/'/g, "''"]),
  findAndCountProjection: projection({ count: pipe(prop(0), Number), rows: prop(1) })
}
