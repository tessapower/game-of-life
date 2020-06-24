const count = require('../ch3-functions/bean-counting');

test('Returns how frequently a character B appears in a string', () => {
    expect(count.countBs("BBC")).toBe(2);
    expect(count.countBs("bbc")).toBe(0);
});

test('Returns how frequently a specific character appears in a string', () => {
    expect(count.countChar("kakkerlak", 'k')).toBe(4);
    expect(count.countChar("kakkerlak", 'K')).toBe(0);
    expect(count.countChar("kakkerlak", 'o')).toBe(0);
});
