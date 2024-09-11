var rpg = require('../src/main.js');

function test(item, message) {
  console.log('- ' + message);
  console.assert(item);
}

c = new rpg.Character();

test(c, 'Characters can be created');
test(c.health == 1000, 'New characters have 1000 Health');
test(c.level == 1, 'New characters start from level 1');
test(c.alive !== undefined, 'Characters can be Alive or Dead');
test(c.alive, 'New characters are Alive');
test(typeof c.attack == 'function', 'Characters can Deal Damage to Characters');

c2 = new rpg.Character();
c.attack(c2);

test(c2.health < 1000, 'Damage is subtracted from Health');

for (var i=0; i<1000; i++)
  c.attack(c2);

test(c2.health == 0, 'When damage received exceeds current Health, Health becomes 0');
test(!c2.alive, 'and the character is now Dead');

c3 = new rpg.Character();
c.attack(c3);
c.heal(c3);

test(c3.health == 1000, 'A Character can Heal a Character');

c.heal(c2);
test(c2.health == 0, 'Dead characters cannot be healed');

c.attack(c);
test(c.health == 1000, 'A Character cannot Deal Damage to itself');