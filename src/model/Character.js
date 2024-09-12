var maxHealth = 1000;

function Character() {
  this.level = 1;
  this.factions = [];

  this.health = maxHealth;
  this.alive = true;

  this.damageAmount = 1;
  this.healAmount = 1;

  this.positionX = 0;
  this.positionY = 0;

  this.hasRangedWeapon = false;

  this.attack = function (c) {
    if (c == this)
      return;

    if (this.distanceFrom(c) > this.getMaxAttackRange())
      return;

    c.attackFrom(this);
  };

  this.attackFrom = function (c) {
    if (c == this)
      return;

    var realDamageAmount = c.damageAmount;
    if (this.level >= c.level + 5)
      realDamageAmount *= .5;
    else if (this.level <= c.level - 5)
      realDamageAmount *= 1.5;

    if (realDamageAmount >= this.health) {
      this.health = 0;
      this.alive = false;
    } else
      this.health -= realDamageAmount;
  };

  this.heal = function (c) {
    c.healFrom(this);
  };

  this.healFrom = function (c) {
    if (!this.alive)
      return;

    this.health += c.healAmount;
    if (this.health > maxHealth)
      this.health = maxHealth;
  };

  this.distanceFrom = function (c) {
    return Math.sqrt((this.positionX - c.positionX) ** 2 + (this.positionY - c.positionY) ** 2);
  };

  this.getMaxAttackRange = function () {
    return this.hasRangedWeapon ? 20 : 2;
  };

  this.join = function (f) {
    this.factions.push(f);
  };

  this.leave = function (f) {
    var index = this.factions.indexOf(f);
    if (index > -1)
      this.factions.splice(index, 1);
  };

  this.memberOf = function (f) {
    return this.factions.indexOf(f) > -1;
  };

  this.isAlliedOf = function (c) {
    for (var i in this.factions)
      if (c.memberOf(this.factions[i]))
        return true;
    return false;
  };
}

module.exports = {
  Character: Character
};