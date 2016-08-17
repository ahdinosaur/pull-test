#!/usr/bin/env node

const Path = require('path')

module.exports = cli

if (!module.parent) {
  cli({
    cwd: process.cwd(),
    paths: process.argv.slice(2)
  })
}

function cli (options) {
  const cwd = options.cwd
  const paths = options.paths

  paths.forEach(function (path) {
    require(Path.resolve(cwd, path))
  })
}
