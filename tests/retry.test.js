const retry = require('../ch8-bugs/retry');

test('only return result if call succeeds', () => {
    let result = retry.reliableMultiply(8, 8);
});
