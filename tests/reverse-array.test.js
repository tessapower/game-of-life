const reverse = require('../ch4-objects-and-arrays/reverse-array');

test('Returns an array with the elements reversed.', () => {
    expect(reverse.reverseArray(['A', 'B', 'C'])).toStrictEqual(['C', 'B', 'A']);
    let array = [1, 2, 3, 4, 5];
    expect(reverse.reverseArrayInPlace(array)).toStrictEqual([5, 4, 3, 2, 1]);
});