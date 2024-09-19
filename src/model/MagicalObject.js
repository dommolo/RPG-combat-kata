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

class MagicalWeapon extends MagicalObject {
    constructor(x, y, health, damageAmount) {
        super(x, y, health);

        this.damageAmount = damageAmount;
    }

    attack(x) {
        if (x == this)
          return;
    
        if (!(x instanceof attackable.Attackable))
          return;
    
        if (this.distanceFrom(x) > this.getMaxAttackRange())
          return;
    
        var realDamageAmount = this.damageAmount;
    
        if (x instanceof Character) {
          if (this.isAlliedOf(x))
            return;
    
          if (x.level >= this.level + 5)
            realDamageAmount *= .5;
          else if (x.level <= this.level - 5)
            realDamageAmount *= 1.5;
        }
    
        x.attacked(realDamageAmount);
      }
}

module.exports = {
    MagicalObject: MagicalObject,
    HealingMagicalObject: HealingMagicalObject,
    MagicalWeapon: MagicalWeapon
};