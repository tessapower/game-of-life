const promise = require('../ch11-async/promise-all');

test('tests if promise returns values asynchronously in order read', () => {
    let passArray = [promise.soon(1), promise.soon(2), promise.soon(3)];
    return promise.all(passArray).then(array => {
        expect(array).toStrictEqual([1, 2, 3]);
    });
});

test('tests if promise returns empty array if called without arguments', () => {
    return promise.all([]).then(array => {
        expect(array).toStrictEqual([]);
    });
});

test('tests if Promise.reject throws error as expected', () => {
    let failArray = [promise.soon(1), Promise.reject("X"), promise.soon(3)];
    return promise.all(failArray).catch(e => expect(e).toMatch("X"));
});
