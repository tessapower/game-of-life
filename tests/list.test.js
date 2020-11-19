const list = require('../ch4-objects-and-arrays/list');

test('Given an array, returns a list.', () => {
    expect(list.arrayToList([10, 20])).toEqual({value: 10, rest: {value: 20, rest: null}});
});

test('Given a list, returns an array.', () => {
    expect(list.listToArray(list.arrayToList([10, 20, 30]))).toStrictEqual([10, 20, 30]);
});

test('Prepends an element to the end of a list.', () => {
    expect(list.prepend(10, list.prepend(20, null))).toEqual({value: 10, rest: {value: 20, rest: null}});
});

test('Returns the nth element in a list', () => {
    expect(list.nth(list.arrayToList([10, 20, 30]), 1)).toBe(20);
});