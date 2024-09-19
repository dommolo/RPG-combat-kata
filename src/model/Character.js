var attackable = require('./Attackable.js');
const magicalObject = require('./MagicalObject.js');

class Character extends attackable.Attackable {
  constructor(x, y) {
    super(x, y, 1000);

    this.alive = true;
    this.level = 1;

    this.damageAmount = 1;
    this.healAmount = 1;

    this.factions = [];

    this.hasRangedWeapon = false;

    this.magicalObject = null;
  }

  attack(x) {
    if (x == this)
      return;

    if (!(x instanceof attackable.Attackable))
      return;

    if (this.distanceFrom(x) > this.getMaxAttackRange())
      return;

    if (x instanceof Character && this.isAlliedOf(x))
        return;

    var realDamageAmount = this.damageAmount;

    if (this.magicalObject instanceof magicalObject.MagicalObject && this.magicalObject.health > 0)
      realDamageAmount = this.magicalObject.damageAmount;
    else if (x instanceof Character) {
      if (x.level >= this.level + 5)
        realDamageAmount *= .5;
      else if (x.level <= this.level - 5)
        realDamageAmount *= 1.5;
    }

    x.attacked(realDamageAmount);
  }

  attacked(x) {
    super.attacked(x);

    if (this.health == 0)
      this.alive = false;
  }

  heal(x) {
    x.healFrom(this);
  }

  healFrom(x) {
    this.healed(x.healAmount);
  }

  join(f) {
    this.factions.push(f);
  }

  getMaxAttackRange() {
    return this.hasRangedWeapon ? 20 : 2;
  }

  leave(f) {
    var index = this.factions.indexOf(f);
    if (index > -1)
      this.factions.splice(index, 1);
  }

  memberOf(f) {
    return this.factions.indexOf(f) > -1;
  }

  isAlliedOf(x) {
    for (var i in this.factions)
      if (x.memberOf(this.factions[i]))
        return true;
    return false;
  }

  equip(x) {
    if (x instanceof magicalObject.MagicalObject) {
      this.magicalObject = x;
      return;
    }
  }
}

module.exports = {
  Character: Character
};