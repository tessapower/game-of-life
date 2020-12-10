/*
 * It would be nice if we could write comments in Egg.
 * For example, whenever we find a hash sign (#), we could
 * treat the rest of the line as a comment and ignore it,
 * similar to // in JavaScript.
 * 
 * We do not have to make any big changes to the parser to
 * support this. We can simply change skipSpace to skip
 * comments as if they are whitespace so that all the points
 * where skipSpace is called will now also skip comments.
 * 
 * Make this change.
 * 
 * This code can be tested here: https://eloquentjavascript.net/code/#12.3
 */

 /*
 Old skipSpace function:
 
 function skipSpace(string) {
    let first = string.search(/\S/);
    if (first == -1) return "";
    return string.slice(first);
 }
  */

function skipSpace(string) {
    let commentsOrWhitespace = string.match(/^(\s|#.*)*/);
    return string.slice(commentsOrWhitespace[0].length);
}