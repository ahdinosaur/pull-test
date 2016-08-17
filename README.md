# pull-test

run assertion tests using [pull streams](https://pull-stream.github.io/)

```shell
npm install --save-dev pull-test
```

## example

```js
const test = require('./')

const tests = {
  ['it succeeds']: function (assert) {
    assert(true)
  },
  ['it fails!']: function (assert) {
    assert(false)
  },
  ['it errors!']: function (assert, cb) {
    cb(new Error('error'))
  }
}

test(tests)
// ✔ it succeeds
// ✖ it fails!
// { AssertionError: false == true
//    at tests (pull-test/example.js:9:5)
//  name: 'AssertionError',
//  actual: false,
//  expected: true,
//  operator: '==',
//  message: 'false == true',
//  generatedMessage: true }
// ▲ test runner ended with an error
// Error: error
//    at tests (pull-test/example.js:12:8)
```

## cli

if `test/*.js` represents a set of files exporting tests,

runs these tests using built-in [`assert`](https://nodejs.org/api/assert.html) and default reporter with:

```
pull-test test/*.js
```

## api

### `test = require('pull-test')`

### `test(tests)`

runs tests using built-in [`assert`](https://nodejs.org/api/assert.html) and default reporter.

### `testSource = test.from(tests)`

creates a source [pull stream](https://pull-stream.github.io/) of test objects,

from any of the following format of tests:

```js
function testTheThing (assert, cb) {
  assert(true), cb()
}
```

```js
{
  ['test the thing']: function (assert, cb) {
    assert(true), cb()
  }
}
```

```js
[{
  name: 'test the thing',
  test: function (assert, cb) {
    assert(true), cb()
  }
}]
```

### `through = test.Tester(options)`

creates a through [pull stream](https://pull-stream.github.io/),

which expects to receive test objects with shape:

- `name`: name of the test
- `test`: function which receives `(assert, cb)`. assert is the same as the [node core `assert` module](https://nodejs.org/api/assert.html) and automatically collects errors. `cb` is to be called when the test is done, or _the test runner has errored_ (it will close the stream with the error).

and will return test result objects with shape:

- `name`: name of test
- `assertions`: array of assertions results from running test. either `true` if assertion passed or an instance of `assert.AssertionError` if assertion failed.
- `duration`: number of microseconds that test took to run

### `sink = test.Reporter(options)`

creates a sink [pull stream](https://pull-stream.github.io/),

which receives test result objects and logs to the console.

## license

The Apache License

Copyright &copy; 2016 Michael Williams

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
