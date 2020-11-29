class PGroup {
    constructor(values) {
        this.values = values;
    }

    add(newValue) {
        if (this.has(newValue)) return this;
        return new PGroup(this.values.concat([newValue]));
    }

    delete(valueToDelete) {
        if (!this.has(valueToDelete)) return this;
        return new PGroup(this.values.filter(v => v !== valueToDelete));
    }

    has(testValue) {
        return this.values.includes(testValue);
    }
}

PGroup.empty = new PGroup([]);

module.exports = { PGroup };