/* Define a recursive function isEven corresponding to this description.
 * The function should accept a single parameter (a positive, whole number) 
 * and return a Boolean. Test it on 50 and 75. See how it behaves on -1.
 * Why? Can you think of a way to fix this?
 */

module.exports = function isEven(x) {
    if (x == 0) {
        return true;
    } else if (x == 1) {
        return false;
    } else if (x < 0) {
        return(isEven(-x));
    } else {
        return (isEven(x-2));
    }
}
