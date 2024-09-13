var attackable = require('./Attackable.js');

class Character extends attackable.Attackable {
  constructor(x, y) {
    super(x, y, 1000);

    this.level = 1;

    this.damageAmount = 1;
    this.healAmount = 1;

    this.factions = [];

    this.hasRangedWeapon = false;
  }

  attack(c) {
    if (c == this)
      return;

    if (!(c instanceof attackable.Attackable))
      return;

    if (this.distanceFrom(c) > this.getMaxAttackRange())
      return;

    if (c instanceof Character) {
      if (this.isAlliedOf(c))
        return;

      c.attackFrom(this);
    }
  }

  attackFrom(c) {
    if (c == this)
      return;

    var realDamageAmount = c.damageAmount;
    if (this.level >= c.level + 5)
      realDamageAmount *= .5;
    else if (this.level <= c.level - 5)
      realDamageAmount *= 1.5;

    this.attacked(realDamageAmount);
  }

  heal(c) {
    c.healFrom(this);
  }

  healFrom(c) {
    this.healed(c.healAmount);
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

  isAlliedOf(c) {
    for (var i in this.factions)
      if (c.memberOf(this.factions[i]))
        return true;
    return false;
  }
}

module.exports = {
  Character: Character
};