/*
 * Write a function called withBoxUnlocked that takes a function value as argument,
 * unlocks the box, runs the function, and then ensures that the box is locked again
 * before returning, regardless of whether the argument function returned normally
 * or threw an exception.
 */

const box = {
locked: true,
unlock() { this.locked = false; },
    lock() { this.locked = true;  },
        content: [],
    get content() {
        if (this.locked) throw new Error("Locked!");
        return this._content;
    }
};

function withBoxUnlocked(body) {
    if (!box.locked) {
        return body();
    }

    box.unlock();
    try {
        return body();
    } finally {
        box.lock();
    }
}

exports.box = box;
exports.withBoxUnlocked = withBoxUnlocked;