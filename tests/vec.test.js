const Vec = require('../ch6-objects/vec');

test('Adds one 2D vector to another', () => {
    let vector = new Vec(1, 2);
    expect(vector.plus(new Vec(2, 3))).toEqual({"x": 3, "y": 5 });
});

test('Subtracts one 2D vector from another.', () => {
    let vector = new Vec(1, 2);
    expect(vector.minus(new Vec(2, 3))).toEqual({"x": -1, "y": -1});
});

test('Returns the length (magnitude) of a 2D vector', () => {
    expect(new Vec(3, 4).length).toBe(5);
});
