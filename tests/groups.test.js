const { Grp, Group } = require('../ch6-objects/groups');

test('Create a new set of values', () => {
    let group1 = Group.from([10, 20]);
    expect(group1.values).toEqual([ 10, 20 ]);

    let group2 = Group.from([30, 40]);
    expect(group2.values).toEqual([ 30, 40 ]);
});

test('Check if a value exists in a set', () => {
    let group3 = Group.from([10, 20]);
    expect(group3.has(30)).toBeFalsy();
    expect(group3.has(1)).toBeFalsy();
    expect(group3.has(2)).toBeFalsy();
    expect(group3.has(0)).toBeFalsy();
    expect(group3.has(20)).toBeTruthy();
    expect(group3.has(10)).toBeTruthy();
});

test('Add a new value to the set if it doesn\'t already exist', () => {
    let group4 = Group.from([10, 20]);
    group4.add(10);
    expect(group4.values).toEqual([ 10, 20 ]);
    group4.add(20);
    expect(group4.values).toEqual([ 10, 20 ])
    group4.add(1);
    expect(group4.values).toEqual([ 10, 20, 1 ]);
    group4.add(2);
    expect(group4.values).toEqual([ 10, 20, 1, 2 ]);
    group4.add(0);
    expect(group4.values).toEqual([ 10, 20, 1, 2, 0 ]);
    group4.add(30);
    expect(group4.values).toEqual([ 10, 20, 1, 2, 0, 30 ]);
});

