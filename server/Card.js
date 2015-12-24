var util = require("util");

// Constructor
function Card(paths) {
  this.paths = expandPath(paths || [5,4,7,6]); // All straight lines
}

Card.prototype.travelPath = function(entryPoint) {
  for (var i = 0; i < this.paths.length; i++) {
    if (this.paths[i] !== null) {
      if (this.paths[i] === entryPoint) return i;
      else if (i == entryPoint) return this.paths[i];
    }
  }

  util.error("No path found");
};

/**
 * Get the expanded path by making exit/entry points match
 * @param path The path to expand
 * @returns {*} The path array with matching entry/exit points
 */
function expandPath(path) {
  for(var i = 0; i < path.length; i++) {
    if (path[i] && !path[path[i]]) {
      path[path[i]] = i;
    }
  }
  return path;
}

/**
 * Get the vector from a positio on a tile
 * @param z The index representing a position on a tile
 * @returns {{x: number, y: number}}
 */
function getDirection(z) {
  var x = 0; y = 0;
  switch (z) {
    case 0:
    case 1:
      x = -1;
    case 2:
    case 3:
      y = 1;
    case 4:
    case 5:
      x = 1;
    case 6:
    case 7:
      y = -1;
    default:
      util.error("Direction not found");
  }

  return {x: x, y: y};
}

Card.expandPath = expandPath;
Card.getDirection = getDirection; // expose as class functions

/*  Explanation of path arrays:

Array with the values [5, 4, 7, 6) becomes [5, 4, 7, 6, 1, 0, 3, 2]

    2   3
    |   |
 1--+---+--4
    |   |
 0--+---+--5
    |   |
    7   6

Array with the values [7, 2, null, 4, null, 6] becomes [7, 2, 1, 4, 3, 6, 5, 0]

     2   3
     |   |
    /     \
 1_/       \_4

 0__      __5
    \    /
     |   |
     7   6

For now, all paths must work backwards and forwards. If you enter on six and leave at 5, when you enter 5 you must leave 6.

*/

// export the class
module.exports = Card;