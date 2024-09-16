var positioned = require('./Positioned.js');

class Attackable extends positioned.Positioned {
    constructor(x, y, health) {
        super(x, y);

        this.health = health > 0 ? health : 1;
        this.maxHealth = this.health;
    }

    attacked(damageAmount) {
        if (damageAmount >= this.health)
            this.health = 0;
        else
            this.health -= damageAmount;
    }

    healed(healAmount) {
        if (!this.alive)
          return false;
        
        this.health += healAmount;
        if (this.health > this.maxHealth)
          this.health = this.maxHealth;

        return true;
    }
}

module.exports = {
    Attackable: Attackable
};