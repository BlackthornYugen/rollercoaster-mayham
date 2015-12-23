// Constructor
function Card(paths) {
  this.paths = paths || [5,4,7,6]; // All straight lines
}


Card.prototype.travelPath = function(entryPoint) {
    for (var i = 0; i < this.paths.length; i++) {
        if (this.paths[i] !== null) {
            if (this.paths[i] === entryPoint) return i;
            else if (i == entryPoint) return this.paths[i];
        }
    }

    throw "No Path";
}


/*  Explination of path arrays:

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