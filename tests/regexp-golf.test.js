const regex = require('../ch9-regex/regexp-golf')

test('test complex regular expressions', () => {

    let regexps = [regex.carOrCat,
        regex.popOrProp,
        regex.ferretFerryFerrari,
        regex.ious,
        regex.wsThenSymbol,
        regex.wordLongerThan6,
        regex.wordWithoutE];
        
    let passCases = [["my car", "bad cats"],
        ["pop culture", "mad props"],
        ["ferret", "ferry", "ferrari"],
        ["how delicious", "spacious room"],
        ["bad punctuation ."],
        ["Siebentausenddreihundertzweiundzwanzig"],
        ["red platypus", "wobbling nest"]];
        
    let failCases = [["camper", "high art"],
        ["plop", "prrrop"],
        ["ferrum", "transfer A"],
        ["ruinous", "consciousness"],
        ["escape the period"],
        ["no", "three small words"],
        ["earth bed", "learning ape", "BEET"]];
        
        
    for (let i = 0; i < regexps.length; i++) {

       for (let testCase of passCases[i]) {
            expect(regexps[i].test(testCase)).toBeTruthy;
        }
    
        for (let testCase of failCases[i]) {
            expect(regexps[i].test(testCase)).toBeFalsy;
        }
    }
});
