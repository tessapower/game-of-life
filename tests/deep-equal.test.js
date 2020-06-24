const compare = require('../ch4-objects-and-arrays/deep-equal');

test('Returns true only if given values are the same value or are objects with the same properties, and the properties values are the same.', () => {
    let obj = {here: {is: "an"}, object: 2};
    expect(compare(obj, obj)).toBe(true);
    expect(compare(obj, {here: 1, object: 2})).toBe(false);
    expect(compare(obj, {here: {is: "an"}, object: 2})).toBe(true);
});