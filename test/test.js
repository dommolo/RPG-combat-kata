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

var tests = [];

tests.push(function () {
  var c = new rpg.Character();

  test(c, 'Characters can be created');
});

tests.push(function () {
  var c = new rpg.Character();

  testEquals(c.health, 1000, 'New characters have 1000 Health');
});
tests.push(function () {
  var c = new rpg.Character();

  testEquals(c.level, 1, 'New characters start from level 1');
});

tests.push(function () {
  var c = new rpg.Character();

  test(c.alive !== undefined, 'Characters can be Alive or Dead');
});

tests.push(function () {
  var c = new rpg.Character();

  test(c.alive, 'New characters are Alive');
});

tests.push(function () {
  var c = new rpg.Character();

  test(typeof c.attack == 'function', 'Characters can Deal Damage to Characters');
});

tests.push(function () {
  var c1 = new rpg.Character(), c2 = new rpg.Character();
  c1.attack(c2);

  test(c2.health < 1000, 'Damage is subtracted from Health');
});

tests.push(function () {
  var c1 = new rpg.Character(), c2 = new rpg.Character();
  for (var i = 0; i < 1000; i++)
    c1.attack(c2);

  testEquals(c2.health, 0, 'When damage received exceeds current Health, Health becomes 0');
  test(!c2.alive, 'and the character is now Dead');
});

tests.push(function () {
  var c1 = new rpg.Character(), c2 = new rpg.Character();
  c2.health = 999;
  c1.heal(c2);

  testEquals(c2.health, 1000, 'A Character can Heal a Character');
});

tests.push(function () {
  var c1 = new rpg.Character(), c2 = new rpg.Character();
  c2.health = 0;
  c2.alive = false;
  c1.heal(c2);

  testEquals(c2.health, 0, 'Dead characters cannot be healed');
});

tests.push(function () {
  var c1 = new rpg.Character(), c2 = new rpg.Character();
  c2.heal(c1);

  testEquals(c1.health, 1000, 'Healing cannot raise health above 1000');
});

tests.push(function () {
  var c = new rpg.Character();
  c.attack(c);

  testEquals(c.health, 1000, 'A Character cannot Deal Damage to itself');
});

tests.push(function () {
  var c1 = new rpg.Character(), c2 = new rpg.Character();

  c2.level = 6;
  c1.attack(c2);

  testEquals(c2.health, 1000 - c1.damageAmount * .5, 'If the target is 5 or more Levels above the attacker, Damage is reduced by 50%');
});

tests.push(function () {
  var c1 = new rpg.Character(), c2 = new rpg.Character();
  c2.level = 6;
  c2.attack(c1);

  testEquals(c1.health, 1000 - c2.damageAmount * 1.5, 'If the target is 5 or more Levels below the attacker, Damage is increased by 50%');
});

for (var i in tests)
  tests[i]();