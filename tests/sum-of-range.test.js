const sum = require('../ch4-objects-and-arrays/sum-of-range');

test('Returns the sum of a range of numbers.', () => {
    expect(sum.range(1, 10)).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(sum.range(5, 2, -1)).toStrictEqual([5, 4, 3, 2]);
    expect(sum.sum(sum.range(1, 10))).toBe(55);
});
