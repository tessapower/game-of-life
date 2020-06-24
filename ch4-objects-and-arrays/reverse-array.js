/*
 * Write two functions, reverseArray and reverseArrayInPlace. The first, reverseArray,
 * takes an array as argument and produces a new array that has the same elements in 
 * the inverse order. The second, reverseArrayInPlace, does what the reverse method
 * does: it modifies the array given as argument by reversing its elements. Neither
 * may use the standard reverse function.
 */

function reverseArray(array) {
// Returns a new array with the elements of the passed array in reverse order
    let newArray = [];
    for (let element of array) {
        newArray.unshift(element);
    }
    return newArray;
}

function reverseArrayInPlace(array) {
// Returns the original passed array with the elements in reverse order
    for (let i = 0; i < (array.length/2); i++) {
        let leftElement = array[i];
        let rightElement = array[array.length - 1 - i];
        array[i] = rightElement;
        array[array.length - 1 - i] = leftElement;
    }
    return array;
}

exports.reverseArray = reverseArray;
exports.reverseArrayInPlace = reverseArrayInPlace;
