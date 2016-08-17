module.exports = wrapAssert

function wrapAssert (assertions, assert) {
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
        [key]: wrap(assertions, assert[key], AssertionError)
      })
    }, wrap(assertions, assert, AssertionError))
}

function wrap (assertions, assertFn, AssertionError) {
  return function assert () {
    try {
      assertFn.apply(this, arguments)
      assertions.push(true)
    } catch (err) {
      const wrappedError = new AssertionError({
        stackStartFunction: assert,
        actual: err.actual,
        expected: err.expected,
        operator: err.operator,
        message: err.generatedMessage === false
          ? err.message : null
      })
      assertions.push(wrappedError)
    }
  }
}
