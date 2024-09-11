function Character() {
  this.health = 100;
  this.level = 1;
  this.alive = true;
  this.damage = 1;
  
  this.attack = function(c) {
    c.health -= this.damage;
  };
}

module.exports = {
  Character: Character
};