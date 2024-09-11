var rpg = require('../src/main.js');

function test(item, message) {
  console.log(message);
  console.assert(item);
}

c = new rpg.Character();

test(c, 'Characters can be created');
test(c.health == 100, 'New characters have 1000 Health');
test(c.level == 1, 'New characters start from level 1');
test(c.alive !== undefined, 'Characters can be Alive or Dead');
test(c.alive, 'New characters are Alive');
test(typeof c.attack == 'function', 'Characters can Deal Damage to Characters');

c2 = new rpg.Character();
c.attack(c2);

test(c2.health < 100, 'Damage is subtracted from Health');