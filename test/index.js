'use strict'

const Mocha = require('mocha')
const { join } = require('path')
const { forEach, map, pipe, bind } = require('ramda')

const mocha = new Mocha({ timeout: 60000 })
const absolutePath = (path) => join(__dirname, path)

const addFiles = pipe(
  map(absolutePath),
  forEach(bind(mocha.addFile, mocha))
)

const paths = [
    './module.js',
]

addFiles(paths)
mocha.run()
  .on('end', process.exit)
