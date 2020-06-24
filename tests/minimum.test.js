const min = require('../ch3-functions/minimum');

test('Returns the smaller of two whole numbers', () => {
    expect(min(0, 10)).toBe(0);
    expect(min(0, -10)).toBe(-10);
    expect(min(-Infinity, Infinity)).toBe(-Infinity);
    expect(min(null, 0)).toBe(0);
});
