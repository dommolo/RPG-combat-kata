var attackable = require('./Attackable.js');

class Thing extends attackable.Attackable {
  constructor(x, y, health, name) {
    super(x, y, health);

    this.name = name;
    this.destroyed = false;
  }

  attacked(x) {
    super.attacked(x);

    if (this.health == 0)
      this.destroyed = true;
  }

  healFrom(_) {
    return;
  }
}

module.exports = {
  Thing: Thing
};