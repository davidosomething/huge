'use strict';

var readline = require('readline');
var parseInput = require('../huge/parseInput');

module.exports = function () {
  var rl = readline.createInterface(process.stdin, process.stdout);

  rl.setPrompt('enter command: ');
  rl.prompt();

  rl.on('line', function(line) {
    var input = line.split(' ');

    if (parseInput(input) === false) {
      rl.close();
    }

    rl.prompt();

  }).on('close', function() {

    process.exit(0);

  });
};
