const regex = require('../ch9-regex/quoting-style');

let text = `'I'm the cook,' he said, 'it's my job.'`;

test('Replace non-grammatical single quotes with double quotes', () => {
    expect(text.replace(regex.replaceQuotes, '$1"$2')).toBe(`\"I'm the cook,\" he said, \"it's my job.\"`);
});
