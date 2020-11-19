const { Group } = require('../ch6-objects/groups');
const { GroupIterator } = require('../ch6-objects/iterable-groups');

test('Group object is iterable', () => {
    let group = Group.from(["a", "b", "c"]);
    expect(group).toHaveProperty([Symbol.iterator]);
});