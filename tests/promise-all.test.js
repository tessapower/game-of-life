const promise = require('../ch11-async/promise-all');

test('tests if promise returns values asynchronously in order read', () => {

    let passArray = [promise.soon(1), promise.soon(2), promise.soon(3)];
    let failArray = [promise.soon(1), Promise.reject("X"), promise.soon(3)];

    expect(promise.all([])).toBeUndefined;
    expect(promise.all(passArray)).toBe([1, 2, 3]);
    expect(promise.all()).toThrowError("X");
});