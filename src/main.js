function Character() {
  this.health = 100;
  this.level = 1;
  this.alive = true;
  this.damageAmount = 1;
  this.healAmount = 1;
  
  this.attack = function(c) {
    c.attackFrom(this);
  };
  
  this.attackFrom = function(c) {
    if (c.damageAmount >= this.health) {
      this.health = 0;
      this.alive = false;
    } else
      this.health -= c.damageAmount;
  };
  
  this.heal = function(c) {
    c.healFrom(this);
  };
  
  this.healFrom = function(c) {
    this.health += c.healAmount;
  };
}

module.exports = {
  Character: Character
};