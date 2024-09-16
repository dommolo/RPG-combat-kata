var attackable = require('./Attackable.js');
const magicalObject = require('./MagicalObject.js');
var thing = require('./Thing.js');

class Character extends attackable.Attackable {
  constructor(x, y) {
    super(x, y, 1000);

    this.alive = true;
    this.level = 1;

    this.damageAmount = 1;
    this.healAmount = 1;

    this.factions = [];
    this.equipement = [];

    this.hasRangedWeapon = false;
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
    for (var i in this.equipement)
      if (this.equipement[i] instanceof magicalObject.MagicalObject)
        return;

    this.equipement.push(x);
  }
}

module.exports = {
  Character: Character
};