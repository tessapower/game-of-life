/* Write a program that uses console.log to print all the numbers from 1 to 100,
 * with two exceptions. For numbers divisible by 3, print "Fizz" instead of the
 * number, and for numbers divisible by 5 (and not 3), print "Buzz" instead.
 *
 * When you have that working, modify your program to print "FizzBuzz" for
 * numbers that are divisible by both 3 and 5 (and still print "Fizz" or "Buzz"
 * for numbers divisible by only one of those).
 */

let counter = 1;

while (counter <= 100) {
    if (counter % 3 == 0 && counter % 5 == 0) { // If current number divisible by 3 and 5
        console.log("FizzBuzz");
    } else if (counter % 3 == 0) { // If current number only divisible by 3
        console.log("Fizz");
    } else if (counter % 5 == 0) { // If current number only divisible by 5
        console.log("Buzz");
    } else { // current number is neither divisible by 3 nor 5
        console.log(counter);
    }
    counter++;
}
