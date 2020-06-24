/* Write a program that creates a string that represents an 8×8 grid, using newline characters 
 * to separate lines. At each position of the grid there is either a space or a "#" character. 
 * The characters should form a chessboard. Passing this string to console.log should show 
 * something like this: 
 *  # # # #
 * # # # #
 *  # # # #
 * # # # #
 *  # # # #
 * # # # #
 *  # # # #
 * # # # #
 * When you have a program that generates this pattern, define a binding size = 8 and change 
 * the program so that it works for any size, outputting a grid of the given width and height.
 */

let size = 8;

// Print an n by n grid
for (let thisRow = 1; thisRow <= size; thisRow++) {
    let row = "";
    if (thisRow % 2 != 0) { // Check if row number is odd, if true start row with a space
        row += " ";
        do {
            if (row.length % 2 != 0) {
                row += "#";
            } else {
                row += " ";
            }
        } while (row.length < size)
        console.log(row);
    } else { // If row number is even, start row with #
        row += "#";
        do {
            if (row.length % 2 != 0) { // Check if the position in the row is odd, if true add a space
                row += " ";
            } else {
                row += "#"; // If position in row is even, add #
            }
        } while (row.length < size)
        console.log(row);
    }
}
