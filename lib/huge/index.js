/*
 * huge
 * https://github.com/davidosomething/huge
 *
 * Copyright (c) 2014 David O'Trakoun
 * Licensed under the MIT license.
 */

'use strict';

var canvasWidth = 0;
var canvasHeight = 0;
var canvas = null;

var terrain = {
  blank: ' ',
  solid: 'x',
};

/**
 * constrain
 *
 * @param int value
 * @param int min
 * @param int max
 * @return int constrained value
 */
function constrain(value, min, max) {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
}

/**
 * constrainX
 * Helper function to constrain X values to the canvas
 * Use these to sanitize inputs since they assume input is indexed by 1
 *
 * @param int x
 * @return int constrained x value
 */
function constrainX(x) {
  return constrain(x, 1, canvasWidth);
}

/**
 * constrainY
 * Helper function to constrain Y values to the canvas
 * Use these to sanitize inputs since they assume input is indexed by 1
 *
 * @param int y
 * @return int constrained y value
 */
function constrainY(y) {
  return constrain(y, 1, canvasHeight);
}

/**
 * drawYBorder
 * Output border for the top of the canvas
 */
function canvasYBorder() {
  // array size 3 is zero-indexed to 1 + 2 for the left and right sides
  var border = new Array(canvasWidth + 3).join('-');
  return border;
}

/**
 * floodFillAlgorithm
 *
 * @param x ZERO INDEXED
 * @param y ZERO INDEXED
 * @param oldTerrain
 * @param newTerrain
 * @return
 */
function floodFillAlgorithm(x, y, oldTerrain, newTerrain) {
  // run status
  if (oldTerrain === null) {
    oldTerrain = canvas[y][x];
  }

  // already filled;
  if (canvas[y][x] !== oldTerrain) {
    return true;
  }

  canvas[y][x] = newTerrain;

  // if modified value is within bounds, fill neighbor
  // left neighbor
  if (x > 0) {
    floodFillAlgorithm(x - 1, y, oldTerrain, newTerrain);
  }
  // right neighbor
  if (x < canvasWidth - 1) {
    floodFillAlgorithm(x + 1, y, oldTerrain, newTerrain);
  }
  // top neighbor
  if (y > 0) {
    floodFillAlgorithm(x, y - 1, oldTerrain, newTerrain);
  }
  // bottom neighbor
  if (y < canvasHeight - 1) {
    floodFillAlgorithm(x, y + 1, oldTerrain, newTerrain);
  }
}

/**
  * createCanvas
  * initializes canvas to width x height array of zeroes
  */
exports.createCanvas = function (width, height) {
  canvasWidth = width;
  canvasHeight= height;
  canvas = [];
  for (var y = 0; y < height; y++) {
    canvas[y] = [];
    for (var x = 0; x < width; x++) {
      canvas[y][x] = terrain.blank;
    }
  }
};

/**
 * canvasToString
 *
 * @return string canvas with border
 */
var canvasToString = function canvasToString() {
  if (!canvasWidth || !canvasHeight) {
    return new Error('No canvas. Create a canvas first.');
  }

  var result = '';
  result += canvasYBorder() + '\n';
  for (var y = 0; y < canvasHeight; y++) {
    result += '|' + canvas[y].join('') + '|' + '\n';
  }
  result += canvasYBorder() + '\n';
  return result;
};

exports.canvasToString = canvasToString;

/**
 * drawCanvas
 * Output the bordered canvas
 */
exports.drawCanvas = function () {
  if (!canvasWidth || !canvasHeight) {
    return new Error('No canvas. Create a canvas first.');
  }

  console.log(canvasToString());
  console.log();
};

/**
 * createLine
 *
 * @param int x1
 * @param int y1
 * @param int x2
 * @param int y2
 * @return bool|Error
 */
var createLine = function createLine(x1, y1, x2, y2) {
  var startx, endx;
  var starty, endy;
  var i;
  if (!canvasWidth || !canvasHeight) {
    return new Error('No canvas. Create a canvas first.');
  }

  if (x1 !== x2 && y1 !== y2) {
    return new Error('Diagonal lines are not supported.');
  }

  if (x1 !== constrainX(x1) ||
      x2 !== constrainX(x2) ||
      y1 !== constrainY(y1) ||
      y2 !== constrainY(y2)) {
    return new Error('Coordinates out of bounds.');
  }

  // check line direction
  startx = x2;
  endx = x1;
  starty = y2;
  endy = y1;

  // vertical line or one dot
  if (x1 === x2) {
    if (y1 <= y2) {
      starty = y1;
      endy = y2;
    }
    for (i = starty; i <= endy; i++) {
      canvas[i - 1][x1 - 1] = terrain.solid;
    }
    return true;
  }

  // horizontal line
  if (y1 === y2) {
    if (x1 <= x2) {
      startx = x1;
      endx = x2;
    }
    for (i = startx; i <= endx; i++) {
      canvas[y1 - 1][i - 1] = terrain.solid;
    }
    return true;
  }

  return new Error('Diagonal lines are not supported.');
};

exports.createLine = createLine;

/**
 * createRect
 * Uses createLine to create a rectangle
 *
 * @param int x1
 * @param int y1
 * @param int x2
 * @param int y2
 * @return bool|Error
 */
exports.createRect = function (x1, y1, x2, y2) {
  if (!canvasWidth || !canvasHeight) {
    return new Error('No canvas. Create a canvas first.');
  }

  if (x1 !== constrainX(x1) ||
      x2 !== constrainX(x2) ||
      y1 !== constrainY(y1) ||
      y2 !== constrainY(y2)) {
    return new Error('Coordinates out of bounds.');
  }

  // top and bottom
  createLine(x1, y1, x2, y1);
  createLine(x1, y2, x2, y2);

  // left and right
  createLine(x1, y1, x1, y2);
  createLine(x2, y1, x2, y2);

  return true;
};

/**
 * floodFill
 *
 * @param x 1 INDEXED
 * @param y 1 INDEXED
 * @param c some character to fill with
 * @return
 */
exports.floodFill = function (x, y, c) {
  if (!canvasWidth || !canvasHeight) {
    return new Error('No canvas. Create a canvas first.');
  }

  if (x !== constrainX(x) ||
      y !== constrainY(y)) {
    return new Error('Coordinates out of bounds.');
  }

  x = constrainX(x);
  y = constrainY(y);

  // run algorithm with zero-indexed input
  floodFillAlgorithm(x - 1, y - 1, null, c);

  return true;
};

exports.getCanvas = function () {
  return canvas;
};

exports.getCanvasHeight = function () {
  return canvasHeight;
};

exports.getCanvasWidth = function () {
  return canvasWidth;
};
