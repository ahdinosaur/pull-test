const values = require('pull-stream/sources/values')

module.exports = from

function from (test) {
  if (typeof test === 'function') {
    return values([{
      name: test.name || 'test',
      test
    }])
  } else if (Array.isArray(test)) {
    return values(test)
  } else if (typeof test === 'object') {
    return values(
      Object.keys(test)
      .map(function (name) {
        return {
          name,
          test: test[name]
        }
      })
    )
  }
}
