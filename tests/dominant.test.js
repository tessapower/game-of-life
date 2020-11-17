const SCRIPTS = require('../ch5-higher-order-functions/05_higher_order/code/scripts');
const dominantDirection = require('../ch5-higher-order-functions/dominant');

test('Returns the writing direction of the dominant script in a text.', () => {
    expect(dominantDirection("Hello!")).toBe("ltr");
    expect(dominantDirection("Hey, مساء الخير")).toBe("rtl");
});

