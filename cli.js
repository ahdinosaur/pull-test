#!/usr/bin/env node

const Path = require('path')
const cat = require('pull-cat')

const Test = require('./')

module.exports = Cli

if (!module.parent) {
  Cli({
    cwd: process.cwd(),
    paths: process.argv.slice(2)
  })
}

function Cli (options) {
  const cwd = options.cwd
  const paths = options.paths

  Test({
    source: cat(paths.map(function (path) {
      const resolvedPath = Path.resolve(cwd, path)
      const test = require(resolvedPath)
      return Test.from(test)
    }))
  })
}
