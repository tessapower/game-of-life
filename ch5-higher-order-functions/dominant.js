/* Write a function that computes the dominant writing direction in a string of text.
 * Remember that each script object has a direction property that can be "ltr" (left 
 * to right), "rtl" (right to left), or "ttb" (top to bottom). The dominant direction
 * is the direction of a majority of the characters that have a script associated with 
 * them.
 */

 // Load dependencies
require('./05_higher_order/code/load')('./code/scripts.js', 
'./code/chapter/05_higher_order.js', './code/intro.js');

module.exports = function dominantDirection(text) {

    // Identify and count each character by it's script
    let scripts = countBy(text, char => {
        let script = characterScript(char.codePointAt(0));
  		return script ? script.name : "none";
    }).filter(({name}) => name != "none");
	
  	// Find the script with the highest count
  	let dominantScript = (scripts.reduce((a, b) => a > b ? a : b)).name;

  	// Return the dominant script's direction
  	for (let script of SCRIPTS) {
      	if (script.name == dominantScript) {
      		return script.direction;
        }
    }
}
