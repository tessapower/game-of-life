/* Write a loop that makes seven calls to
 * console.log to output the following triangle:
 * #
 * ##
 * ###
 * ####
 * #####
 * ######
 * #######
 */

let triangle = "#";

while (triangle.length <= 7) {
    console.log(triangle);
    triangle += "#";
}
