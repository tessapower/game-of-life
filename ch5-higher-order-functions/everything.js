/* Analogous to the some method, arrays also have an every method.
 * This one returns true when the given function returns true for
 * every element in the array. In a way, some is a version of the
 * || operator that acts on arrays, and every is like the && operator.
 * Implement every as a function that takes an array and a predicate
 * function as parameters. Write two versions, one using a loop and
 * one using the some method.
 */

// First version of every using a loop
function every(array, test) {
    for (let element in array) {
        if (!test(array[element])) {
            return false;
        }
    }
    return true;
}

// Second version of every using the some method
function every2(array, test) {
    return !array.some(element => !test(element));
}

exports.every = every;
exports.every2 = every2;
