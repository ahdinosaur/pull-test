const pull = require('pull-stream/pull')
const map = require('pull-stream/throughs/map')
const asyncMap = require('pull-stream/throughs/async-map')

const wrapAssert = require('./wrapAssert') 

module.exports = Tester

function Tester (options) {
  const assert = options.assert
  const AssertionError = assert.AssertionError

  const results = asyncMap(function (testObject, cb) {
    const test = testObject.test
    const name = testObject.name
    const start = Date.now()

    const assertions = []
    const wrappedAssert = wrapAssert(assertions, assert)

    if (test.length === 2) {
      test(wrappedAssert, function (err) {
        if (err) return cb(err)

        const duration = Date.now() - start

        cb(null, {
          name,
          duration,
          assertions
        })
      })
    } else {
      test(wrappedAssert)

      const duration = Date.now() - start

      cb(null, {
        name,
        duration,
        assertions
      })
    }
  })

  return pull(results, map(function (result) {
    const assertions = result.assertions

    return Object.assign(result, {
      failed: hasError(AssertionError, assertions),
      errors: assertions.filter(function (a) {
        return a instanceof AssertionError
      })
    })
  }))
}

function hasError(AssertionError, assertions) {
  for (var i = 0; i < assertions.length; i++) {
    if (assertions[i] instanceof AssertionError) {
      return true
    }
  }
  return false
}
