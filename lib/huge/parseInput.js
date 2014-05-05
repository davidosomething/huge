'use strict';

var huge = require('./index');

module.exports = function (input) {
  var command = input[0].toUpperCase();
  var args = input.slice(1);
  var result;
  var x1, y1, x2, y2, c;

  // @TODO break this up and DRY out validation
  switch (command) {
    case 'Q':
      return false;

    case 'C':
      if (args.length < 2) {
        result = new Error('Error: Missing args. Expected C w h');
        break;
      }

      var canvasWidth = parseInt(args[0], 10);
      var canvasHeight = parseInt(args[1], 10);
      if (canvasWidth < 0) {
        result = new Error('Error: Invalid width.');
        break;
      }
      if (canvasHeight < 0) {
        result = new Error('Error: Invalid height.');
        break;
      }
      if (!canvasWidth || !canvasHeight) {
        result = new Error('Error: Invalid args. Expected: C w h');
        break;
      }

      result = huge.createCanvas(canvasWidth, canvasHeight);
      break;

    case 'L':
      if (args.length < 4) {
        result = new Error('Error: Invalid format. Expected: L x1 x2 x3 x4');
        break;
      }

      x1 = parseInt(args[0], 10);
      y1 = parseInt(args[1], 10);
      x2 = parseInt(args[2], 10);
      y2 = parseInt(args[3], 10);
      result = huge.createLine(x1, y1, x2, y2);
      break;

    case 'R':
      if (args.length < 4) {
        result = new Error('Error: Invalid format. Expected: R x1 x2 x3 x4');
        break;
      }

      x1 = parseInt(args[0], 10);
      y1 = parseInt(args[1], 10);
      x2 = parseInt(args[2], 10);
      y2 = parseInt(args[3], 10);
      result = huge.createRect(x1, y1, x2, y2);
      break;

    case 'B':
      if (args.length < 3) {
        result = new Error('Error: Invalid format. Expected: B x y c');
        break;
      }

      x1 = parseInt(args[0], 10);
      y1 = parseInt(args[1], 10);
      c = args[2].charAt(0);
      result = huge.floodFill(x1, y1, c);
      break;
  }

  if (result instanceof Error) {
    console.error(result);
  }
  else {
    huge.drawCanvas();
  }
};
