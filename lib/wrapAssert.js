module.exports = wrapAssert

function wrapAssert (errors, assert) {
  const AssertionError = assert.AssertionError

  return Object.getOwnPropertyNames(assert)
    .filter(function (key) {
      switch (key) {
        case 'name':
        case 'length':
        case 'AssertionError':
          return false
        default:
          return true
      }
    })
    .reduce(function (sofar, key) {
      return Object.assign(sofar, {
        [key]: wrap(errors, assert[key], AssertionError)
      })
    }, wrap(errors, assert, AssertionError))
}

function wrap (errors, assertFn, AssertionError) {
  return function assert () {
    try {
      assertFn.apply(this, arguments)
    } catch (err) {
      const wrappedError = new AssertionError({
        stackStartFunction: assert,
        actual: err.actual,
        expected: err.expected,
        operator: err.operator,
        message: err.generatedMessage === false
          ? err.message : null
      })
      errors.push(wrappedError)
    }
  }
}
