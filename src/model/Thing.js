var attackable = require('./Attackable.js');

class Thing extends attackable.Attackable {
  constructor(x, y, health, name) {
    super(x, y, health);
    this.name = name;
  }
}

module.exports = {
  Thing: Thing
};