'use strict'

module.exports = {
  mix,
  promiseSerial
}

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
