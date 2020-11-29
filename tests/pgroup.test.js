const { PGroup } = require('../ch7-project-robot/pgroup');

test('add new values to empty PGroup', () => {
    let a = PGroup.empty.add("a");
    expect(a.values).toEqual([ "a" ]);
});

test('create new PGroup with values from existing PGroup', () => {
    let a = PGroup.empty.add("a");
    let ab = a.add("b");
    expect(ab.values).toEqual([ "a", "b" ]);
});


test('create new PGroup by deleting values from existing PGroup', () => {
    let a = PGroup.empty.add("a");
    let ab = a.add("b");
    let b = ab.delete("a");
    expect(b.values).toEqual([ "b" ]);
});