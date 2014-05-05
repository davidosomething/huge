'use strict';

var huge = require('../lib/huge');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports['createCanvas'] = {
  setUp: function(done) {
    done();
  },

  'no canvas': function(test) {
    test.expect(1);
    test.equal(huge.getCanvas(), null, 'should be null.');
    test.done();
  },

  'C 20 4': function(test) {
    test.expect(1);
    huge.createCanvas(20, 4);
    test.deepEqual(huge.getCanvas(),
               [
                 [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',],
                 [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',],
                 [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',],
                 [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',],
               ], 'should be array.');
    test.done();
  },

  'L 1 2 6 2': function(test) {
    test.expect(1);
    huge.createLine(1, 2, 6, 2);
    test.deepEqual(huge.getCanvas(),
               [
                 [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',],
                 ['x','x','x','x','x','x',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',],
                 [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',],
                 [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',],
               ], 'should be array.');
    test.done();
  },

  'L 6 3 6 4': function(test) {
    test.expect(1);
    huge.createLine(6, 3, 6, 4);
    test.deepEqual(huge.getCanvas(),
               [
                 [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',],
                 ['x','x','x','x','x','x',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',],
                 [' ',' ',' ',' ',' ','x',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',],
                 [' ',' ',' ',' ',' ','x',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',],
               ], 'should be array.');
    test.done();
  },

  'R 16 1 20 3': function(test) {
    test.expect(1);
    huge.createRect(16, 1, 20, 3);
    test.deepEqual(huge.getCanvas(),
               [
                 [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','x','x','x','x','x',],
                 ['x','x','x','x','x','x',' ',' ',' ',' ',' ',' ',' ',' ',' ','x',' ',' ',' ','x',],
                 [' ',' ',' ',' ',' ','x',' ',' ',' ',' ',' ',' ',' ',' ',' ','x','x','x','x','x',],
                 [' ',' ',' ',' ',' ','x',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',],
               ], 'should be array.');
    test.done();
  },

  'B 10 3 o': function(test) {
    test.expect(1);
    huge.floodFill(10, 3, 'o');
    test.deepEqual(huge.getCanvas(),
               [
                 ['o','o','o','o','o','o','o','o','o','o','o','o','o','o','o','x','x','x','x','x',],
                 ['x','x','x','x','x','x','o','o','o','o','o','o','o','o','o','x',' ',' ',' ','x',],
                 [' ',' ',' ',' ',' ','x','o','o','o','o','o','o','o','o','o','x','x','x','x','x',],
                 [' ',' ',' ',' ',' ','x','o','o','o','o','o','o','o','o','o','o','o','o','o','o',],
               ], 'should be array.');
    test.done();
  },

};
