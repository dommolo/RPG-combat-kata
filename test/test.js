var rpg = require('../src/main.js');

function test(item, message) {
  console.log('- ' + message);
  console.assert(item);
}

function testEquals(actual, expected, message) {
  var out = expected == actual;
  console.log('- ' + message);
  console.assert(out);
  if (!out)
    console.log('Expected value: ' + expected + ', actual value: ' + actual);
}

c = new rpg.Character();

test(c, 'Characters can be created');
testEquals(c.health, 1000, 'New characters have 1000 Health');
testEquals(c.level, 1, 'New characters start from level 1');
test(c.alive !== undefined, 'Characters can be Alive or Dead');
test(c.alive, 'New characters are Alive');
test(typeof c.attack == 'function', 'Characters can Deal Damage to Characters');

c2 = new rpg.Character();
c.attack(c2);

test(c2.health < 1000, 'Damage is subtracted from Health');

for (var i=0; i<1000; i++)
  c.attack(c2);

testEquals(c2.health, 0, 'When damage received exceeds current Health, Health becomes 0');
test(!c2.alive, 'and the character is now Dead');

c3 = new rpg.Character();
c.attack(c3);
c.heal(c3);

testEquals(c3.health, 1000, 'A Character can Heal a Character');

c.heal(c2);
testEquals(c2.health, 0, 'Dead characters cannot be healed');

c3.heal(c);
testEquals(c.health, 1000, 'Healing cannot raise health above 1000');

c.attack(c);
testEquals(c.health, 1000, 'A Character cannot Deal Damage to itself');

c4 = new rpg.Character();
c4.level = 6;
c.attack(c4);
testEquals(c4.health, 1000 - c.damageAmount * .5, 'If the target is 5 or more Levels above the attacker, Damage is reduced by 50%');

c5 = new rpg.Character();
c4.attack(c5);
testEquals(c5.health, 1000 - c4.damageAmount * 1.5, 'If the target is 5 or more Levels below the attacker, Damage is increased by 50%');