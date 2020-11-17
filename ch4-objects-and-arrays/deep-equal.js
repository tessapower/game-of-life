/* Write a function deepEqual that takes two values and returns true only if they
 * are the same value or are objects with the same properties, where the values of 
 * the properties are equal when compared with a recursive call to deepEqual. To 
 * find out whether values should be compared directly (use the === operator for 
 * that) or have their properties compared, you can use the typeof operator. If 
 * it produces "object" for both values, you should do a deep comparison. But you 
 * have to take one silly exception into account: because of a historical accident, 
 * typeof null also produces "object".
 */

module.exports = function deepEqual(x, y) {
    // Base case: compare types and values of the passed arguments
    if (x === y) {
        return true;
    }
  
    // If then the passed argument has the value null or is not of type object, return false.
    if (x == null || typeof x != "object" ||
        y == null || typeof y != "object") {
        return false;
    }

    let propertiesX = Object.keys(x), propertiesY = Object.keys(y);

    // compare the number of properties each object contains
    if (propertiesX.length != propertiesY.length) {
        return false;
    }

    // compare corresponding property values of both objects
    for (let property of propertiesX) {
        if (!propertiesY.includes(property) || !deepEqual(x[property], y[property])) {
          return false;
        }
    }
    return true;
}
