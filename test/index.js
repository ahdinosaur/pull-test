const pull = require('pull-stream')
const test = require('../')

module.exports = [
  {
    name: 'pull-test',
    test: function (assert) {
      assert(test)
    }
  }
]
