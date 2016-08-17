const drain = require('pull-stream/sinks/drain')
const color = require('fuzzy-ansi-color')

module.exports = Reporter

function Reporter (options) {
  const assert = options.assert
  const AssertionError = assert.AssertionError

  var allPass = true

  return drain(function (result) {
    const name = result.name

    if (!result.failed) {
      console.log(pass('✔ ' + name))
    }
    else {
      allPass = false
      console.log(fail('✖ ' + name))
      result.errors.forEach(function (a) {
        console.error(a)
      })
    }
  }, function (err) {
    if (err) {
      console.log(caution('▲ test runner ended with an error'))
      console.error(err)
      process.exit(1)
    } else if (allPass) {
      console.log(pass('all tests passed'))
      process.exit(0)
    } else {
      console.log(fail('some tests failed'))
      process.exit(1)
    }
  })
}

function caution (str) {
  return color('orange') + str + color('reset')
}

function pass (str) {
  return color('green') + str + color('reset')
}

function fail (str) {
  return color('red') + str + color('reset')
}

