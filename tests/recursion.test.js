const isEven = require('../ch3-functions/recursion');

test('Returns if a number is even', () => {
    expect(isEven(50)).toBe(true);
    expect(isEven(75)).toBe(false);
    expect(isEven(-1)).toBe(false);
    expect(isEven(0)).toBe(true);
    expect(isEven(-5)).toBe(false);
});
