const check = require('../ch5-higher-order-functions/everything');

test('Returns true if every element in an array returns true for a given function', () => {
    expect(check.every([1, 3, 5], n => n < 10)).toBe(true);
    expect(check.every([2, 4, 16], n => n < 10)).toBe(false);
    expect(check.every([], n => n < 10)).toBe(true);
    expect(check.every([10, 10, 10], n => n < 10)).toBe(false);

    expect(check.every2([1, 3, 5], n => n < 10)).toBe(true);
    expect(check.every2([2, 4, 16], n => n < 10)).toBe(false);
    expect(check.every2([], n => n < 10)).toBe(true);
    expect(check.every2([10, 10, 10], n => n < 10)).toBe(false);
});