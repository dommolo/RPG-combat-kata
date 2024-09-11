function Character() {
  this.health = 1000;
  this.level = 1;
  this.alive = true;
  this.damageAmount = 1;
  this.healAmount = 1;
  
  this.attack = function(c) {
    if (c == this)
      return;
    
    c.attackFrom(this);
  };
  
  this.attackFrom = function(c) {
    if (c == this)
      return;
    
    var realDamageAmount = c.damageAmount;
    if (this.level >= c.level + 5)
      realDamageAmount *= .5;
    
    if (realDamageAmount >= this.health) {
      this.health = 0;
      this.alive = false;
    } else
      this.health -= realDamageAmount;
  };
  
  this.heal = function(c) {
    c.healFrom(this);
  };
  
  this.healFrom = function(c) {
    if (this.alive)
      this.health += c.healAmount;
  };
}

module.exports = {
  Character: Character
};