/*
 * Write a function arrayToList that builds up a list structure like the
 * one shown when given [1, 2, 3] as argument.
 *
 * let list = {
 *     value: 1,
 *     rest: {
 *         value: 2,
 *         rest: {
 *             value: 3,
 *             rest: null
 *         }
 *     }
 * };
 *
 * Also write a listToArray function that produces an array from a list.
 * Then add a helper function prepend, which takes an element and a list
 * and creates a new list that adds the element to the front of the input
 * list, and nth, which takes a list and a number and returns the element
 * at the given position in the list (with zero referring to the first
 * element) or undefined when there is no such element.
 * 
 * If you haven’t already, also write a recursive version of nth.
 */

function arrayToList(array) {
/* Returns a list created from a passed array in the following format:
 * list = { value: foo, rest: { value: bar, rest: { value: bazz, rest: null}}};
 */
    let list = null;
    if (array.length > 0) {
        if (array[1] == undefined) {
            list = {
                value: array[0],
                rest: null
            };
        } else {
            list = {
                value: array[0],
                rest: arrayToList(array.slice(1))
            };
        }
    }
    return list;
}

function listToArray(list) {
/* Returns an array from a passed list with the following format:
 * list = { value: foo, rest: { value: bar, rest: { value: bazz, rest: null}}};
 */
    let array = [];
    while (list.rest != null) {
        array.push(list.value);
        list = list.rest;
    }
    if (list.rest == null) {
        array.push(list.value);
    }
    return array;
}

function prepend(element, list) {
/* Returns a list with a new element added the end in the following format
 * list = { value: foo, rest: { value: bar, rest: { value: bazz, rest: null}}};
 */
    let newList = {
        value: element,
        rest: list
    };
    return newList;
}

function nth(list, index) {
/* Returns the value of the nth element in a list of the following format:
 * list = { value: foo, rest: { value: bar, rest: { value: bazz, rest: null}}};
 */
    let element = undefined;
    if (index > 0 && list.rest == null) {
        return element;
    } else if (index > 0 && list.rest != null) {
        list = list.rest;
        index--;
        nth(list, index);
    }
    
    if (index == 0) {
        element = list.value;
        return element;
    }
}

exports.arrayToList = arrayToList;
exports.listToArray = listToArray;
exports.prepend = prepend;
exports.nth = nth;
