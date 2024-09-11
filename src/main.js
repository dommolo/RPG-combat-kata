function Character() {
  this.health = 100;
  this.level = 1;
  this.alive = true;
  this.damage = 1;
  
  this.attack = function(c) {
    c.attackFrom(this);
  };
  
  this.attackFrom = function(c) {
    if (c.damage >= this.health) {
      this.health = 0;
      this.alive = false;
    } else
      this.health -= c.damage;
  };
}

module.exports = {
  Character: Character
};