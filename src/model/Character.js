var attackable = require('./Attackable.js');
const magicalObject = require('./MagicalObject.js');

class Character extends attackable.Attackable {
  constructor(x, y) {
    super(x, y, 1000);

    this.alive = true;
    this.level = 1;
    this.exp = 0;

    this.damageAmount = 1;
    this.healAmount = 1;

    this.factions = new Set();
    this.pastFactions = new Set();

    this.hasRangedWeapon = false;

    this.magicalObject = null;
  }

  gainExp(amount) {
    this.exp += amount;

    var nextLevelExp = this.level * 1000;

    if (this.exp >= nextLevelExp) {
      this.level++;
      this.exp -= nextLevelExp;
    }
  }

  gainLevel() {
    this.level++;

    if (this.level == 6)
      this.maxHealth = 1500;
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

    if (this.magicalObject instanceof magicalObject.MagicalObject && this.magicalObject.health > 0) {
      realDamageAmount = this.magicalObject.damageAmount;
      this.magicalObject.health--;
    } else if (x instanceof Character) {
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
    else
      this.gainExp(x);
  }

  heal(x) {
    x.healFrom(this);
  }

  healFrom(x) {
    this.healed(x.healAmount);
  }

  getMaxAttackRange() {
    return this.hasRangedWeapon ? 20 : 2;
  }

  join(f) {
    this.factions.add(f);

    if (this.factions.size + this.pastFactions.size == 3 * this.level)
      this.gainLevel();
  }

  leave(f) {
    if (this.factions.has(f))
      this.factions.delete(f);

    this.pastFactions.add(f);
  }

  memberOf(f) {
    return this.factions.has(f);
  }

  isAlliedOf(x) {
    return Array.from(this.factions).filter(f => x.factions.has(f)).length > 0;
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