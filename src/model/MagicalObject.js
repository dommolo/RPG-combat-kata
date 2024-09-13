var thing = require('./Thing.js');

class MagicalObject extends thing.Thing {
    constructor(x, y, health) {
        super(x, y, health)
    }
}

module.exports = {
    MagicalObject: MagicalObject
};