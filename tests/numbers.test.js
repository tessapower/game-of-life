const nums = require('../ch9-regex/numbers');

test('tests if the regex matches to a JS style number', () => {

    let number = nums.regex;

    for (let str of ["1", "-1", "+15", "1.55", ".5", "5.",
        "1.3e2", "1E-4", "1e+12"]) {
        expect(number.test(str)).toBeTruthy;
    }

    for (let str of ["1a", "+-1", "1.2.3", "1+1", "1e4.5",
        ".5.", "1f5", "."]) {
        expect(number.test(str)).toBeFalsy;
    }
});
