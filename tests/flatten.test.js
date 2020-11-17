const flatten = require('../ch5-higher-order-functions/flattening');

test ('Returns a single array has all the elements of the original passed arrays.', () => {    
    let arrays = [[1, 2, 3], [4, 5], [6]];
    expect(arrays.reduce(flatten)).toEqual([1, 2, 3, 4, 5, 6]);
});
