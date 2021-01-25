/*
 * Add support for arrays to Egg by adding the following three functions
 * to the top scope: array(...values) to construct an array containing
 * the argument values, length(array) to get an array’s length, and
 * element(array, n) to fetch the nth element from an array.
 * 
 * This code can be tested here: https://eloquentjavascript.net/code/#12.1
 */

topScope.array = (...values) => values;

topScope.length = array => array.length;

topScope.element = (array, n) => array[n];