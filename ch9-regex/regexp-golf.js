/*
 * Code golf is a term used for the game of trying to express a particular
 * program in as few characters as possible. Similarly, regexp golf is the
 * practice of writing as tiny a regular expression as possible to match a
 * given pattern, and only that pattern.
 * 
 * For each of the following items, write a regular expression to test whether
 * any of the given substrings occur in a string. The regular expression should
 * match only strings containing one of the substrings described. Do not worry
 * about word boundaries unless explicitly mentioned. When your expression works,
 * see whether you can make it any smaller. 
 */

// "car" and "cat"
let carOrCat = /ca(r|t)/;
    
// "pop" and "prop"
let popOrProp = /pr?op/;

// "ferret", "ferry", and "ferrari"
let ferretFerryFerrari = /ferr(et|y|ari)/;

// Any word ending in "ious"
let ious = /ious\b/;

// A whitespace character followed by a period, comma, colon, or semicolon
let wsThenSymbol = /\s(\.|\,|\:|\;)/;

// A word longer than six letters
let wordLongerThan6 = /\w{6,}/;
                
// A word without the letter "e" (or "E")
let wordWithoutE = /\b[^/We]+\b/i;

exports.carOrCat = carOrCat;
exports.popOrProp = popOrProp;
exports.ferretFerryFerrari = ferretFerryFerrari;
exports.ious = ious;
exports.wsThenSymbol = wsThenSymbol;
exports.wordLongerThan6 = wordLongerThan6;
exports.wordWithoutE = wordWithoutE;