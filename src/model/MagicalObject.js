var thing = require('./Thing.js');

class MagicalObject extends thing.Thing {
    constructor(x, y, health) {
        super(x, y, health)
    }
}

class HealingMagicalObject extends MagicalObject {
    constructor(x, y, health) {
        super(x, y, health)

        this.healAmount = health;
    }

    heal(x) {
        if (this.healAmount == 0)
            return false;

        if (x.health + x.healAmount > x.maxHealth)
            this.healAmount = x.maxHealth - x.health;

        if (x.healFrom(this)) {
            this.health -= this.healAmount;
            this.healAmount = this.health;
            return true;
        }

        return false;
    }
}

module.exports = {
    MagicalObject: MagicalObject,
    HealingMagicalObject: HealingMagicalObject
};