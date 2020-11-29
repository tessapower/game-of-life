const lockedBox = require('../ch8-bugs/locked-box')

test('box is locked even after throwing error', () => {
  expect(() => {
    lockedBox.withBoxUnlocked(function() {
        throw new Error("Pirates on the horizon! Abort!");
    })
  }).toThrow("Pirates on the horizon! Abort!");

  expect(lockedBox.box.lock).toBeTruthy;
});