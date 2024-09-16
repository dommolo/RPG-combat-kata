var tester = require('./model/Tester.js');
var rpg = require('../src/main.js');

var tests = new tester.Tester();

tests.add('Characters can be created', function (test) {
  var c = new rpg.Character(0, 0);

  test.assertTrue(!!c, 'character created is not valid');
});

tests.add('New characters have 1000 Health', function (test) {
  var c = new rpg.Character(0, 0);

  test.assertEquals(c.health, 1000, 'initial health is not 1000');
});

tests.add('New characters start from level 1', function (test) {
  var c = new rpg.Character(0, 0);

  test.assertEquals(c.level, 1, 'initial level is not 1');
});

tests.add('Characters can be Alive or Dead', function (test) {
  var c = new rpg.Character(0, 0);

  test.assertTrue(c.alive !== undefined, 'character has not alive property');
});

tests.add('New characters are Alive', function (test) {
  var c = new rpg.Character(0, 0);

  test.assertTrue(c.alive, 'new character is not alive');
});

tests.add('Characters can Deal Damage to Characters', function (test) {
  var c = new rpg.Character(0, 0);

  test.assertTrue(typeof c.attack == 'function', 'character has not attack function');
});

tests.add('Damage is subtracted from Health', function (test) {
  var c1 = new rpg.Character(), c2 = new rpg.Character(0, 0);
  c1.attack(c2);

  test.assertTrue(c2.health < 1000, 'attack does not subtract damage');
});

tests.add('When damage received exceeds current Health, Health becomes 0 and the character is now Dead', function (test) {
  var c1 = new rpg.Character(), c2 = new rpg.Character(0, 0);
  for (var i = 0; i < 1001; i++)
    c1.attack(c2);

  test.assertEquals(c2.health, 0, 'health is not 0');
  test.assertTrue(!c2.alive, 'character is still alive');
});

tests.add('A Character can Heal a Character', function (test) {
  var c1 = new rpg.Character(), c2 = new rpg.Character(0, 0);
  c2.health = 999;
  c1.heal(c2);

  test.assertEquals(c2.health, 1000, 'heal does not restore health');
});

tests.add('Dead characters cannot be healed', function (test) {
  var c1 = new rpg.Character(), c2 = new rpg.Character(0, 0);
  c2.health = 0;
  c2.alive = false;
  c1.heal(c2);

  test.assertEquals(c2.health, 0, 'dead character has been healed');
});

tests.add('Healing cannot raise health above 1000', function (test) {
  var c1 = new rpg.Character(), c2 = new rpg.Character(0, 0);
  c2.heal(c1);

  test.assertEquals(c1.health, 1000, 'healing raise health above 1000');
});

tests.add('A Character cannot Deal Damage to itself', function (test) {
  var c = new rpg.Character(0, 0);
  c.attack(c);

  test.assertEquals(c.health, 1000, 'character healed himself');
});

tests.add('If the target is 5 or more Levels above the attacker, Damage is reduced by 50%', function (test) {
  var c1 = new rpg.Character(), c2 = new rpg.Character(0, 0);

  c2.level = 6;
  c1.attack(c2);

  test.assertEquals(c2.health, 1000 - c1.damageAmount * .5, 'damage is not reduced by 50%');
});

tests.add('If the target is 5 or more Levels below the attacker, Damage is increased by 50%', function (test) {
  var c1 = new rpg.Character(), c2 = new rpg.Character(0, 0);
  c2.level = 6;
  c2.attack(c1);

  test.assertEquals(c1.health, 1000 - c2.damageAmount * 1.5, 'damage is not increased by 50%');
});

tests.add('Characters have an attack Max Range', function (test) {
  var c = new rpg.Character(0, 0);

  test.assertTrue(typeof c.getMaxAttackRange == 'function', 'character has not max attach range getter');
});

tests.add('Melee fighters have a range of 2 meters', function (test) {
  var c = new rpg.Character(0, 0);

  test.assertEquals(c.getMaxAttackRange(), 2, 'max attack range is not 2');
});

tests.add('Ranged fighters have a range of 20 meters', function (test) {
  var c = new rpg.Character(0, 0);
  c.hasRangedWeapon = true;

  test.assertEquals(c.getMaxAttackRange(), 20, 'max attack range is not 20');
});

tests.add('Characters must be in range to deal damage to a target', function (test) {
  var c1 = new rpg.Character(0, 0);
  var c2 = new rpg.Character(2, 0);
  var c3 = new rpg.Character(3, 0);

  c1.attack(c2);
  c1.attack(c3);

  test.assertEquals(c2.health, 1000 - c1.damageAmount, 'character in range has not been damaged');
  test.assertEquals(c3.health, 1000, 'character out of range has been damaged');
});

tests.add('Factions can be created', function (test) {
  var f = new rpg.Faction();

  test.assertTrue(!!f, 'faction created is not valid');
});

tests.add('Characters may belong to one or more Factions', function (test) {
  var c = new rpg.Character(0, 0);
  var f1 = new rpg.Faction();
  var f2 = new rpg.Faction();

  c.join(f1);
  c.join(f2);

  test.assertTrue(c.memberOf(f1), 'character does not belong to first faction');
  test.assertTrue(c.memberOf(f2), 'character does not belong to second faction');
});

tests.add('New Characters belong to no Faction', function (test) {
  var c = new rpg.Character(0, 0);

  test.assertEquals(c.factions.length, 0, 'new characters belong to one or more factions');
});

tests.add('A Character may Leave one or more Factions', function (test) {
  var c = new rpg.Character(0, 0);
  var f = new rpg.Faction();

  c.join(f);
  c.leave(f);

  test.assertFalse(c.memberOf(f), 'character does not leave faction');
});

tests.add('Players belonging to the same Faction are considered Allies', function (test) {
  var c1 = new rpg.Character(0, 0);
  var c2 = new rpg.Character(0, 0);
  var c3 = new rpg.Character(0, 0);
  var f1 = new rpg.Faction();
  var f2 = new rpg.Faction();

  c1.join(f1);
  c2.join(f1);
  c3.join(f2);

  test.assertTrue(c1.isAlliedOf(c2), 'characters with a common faction are not allies');
  test.assertTrue(!c1.isAlliedOf(c3), 'characters of different factions are allies');
});

tests.add('Allies cannot Deal Damage to one another', function (test) {
  var c1 = new rpg.Character(0, 0);
  var c2 = new rpg.Character(0, 0);
  var f = new rpg.Faction();

  c1.join(f);
  c2.join(f);
  c1.attack(c2);

  test.assertEquals(c2.health, 1000, 'allies can deal damage to one another');
});

tests.add('Allies can Heal one another', function (test) {
  var c1 = new rpg.Character(0, 0);
  var c2 = new rpg.Character(0, 0);
  var f = new rpg.Faction();

  c2.health = 999;
  c1.join(f);
  c2.join(f);
  c1.heal(c2);

  test.assertEquals(c2.health, 1000, 'allies cannot heal one another');
});

tests.add('Things can be created', function (test) {
  var t = new rpg.Thing(0, 0);

  test.assertTrue(!!t, 'thing created is not valid');
});

tests.add('Newly created Things must have a name (e.g. "Tree")', function (test) {
  var t = new rpg.Thing(0, 0, 1, 'Tree');

  test.assertEquals(t.name, 'Tree', 'thing name is not valid');
});

tests.add('Newly created Things can have any Health >= 1 (e.g. 2000)', function (test) {
  var t1 = new rpg.Thing(0, 0, 2000, 'Tree');
  var t2 = new rpg.Thing(0, 0, 1000, 'Bush');

  test.assertEquals(t1.health, 2000, 'thing health is not correct');
  test.assertTrue(t2.health > 1, 'thing health 1 or lower');
});

tests.add('Characters can damage Things', function (test) {
  var c = new rpg.Character(0, 0);
  var t = new rpg.Thing(0, 0, 'Table', 10);

  c.attack(t);

  test.assertTrue(t.health < 10, 'character cannot damage thing');
});

tests.add('These things cannot be Healed and they do not Deal Damage', function(test) {
  var c = new rpg.Character(0, 0);
  var t = new rpg.Thing(0, 0, 'Table', 10);

  t.health = 9;
  c.heal(t);

  test.assertEquals(t.health, 9, 'thing can be healed');
  test.assertTrue(t.attack == undefined, 'thing have attack function');
});

tests.add('These things do not belong to Factions; they are neutral', function(test) {
  var t = new rpg.Thing(0, 0, 2000, 'Tree');
  
  test.assertTrue(t.join == undefined, 'things can join factions');
});

tests.add('When reduced to 0 Health, things are *Destroyed*', function(test) {
  var t = new rpg.Thing(0, 0, 2000, 'Tree');
  var c = new rpg.Character(0, 0);

  for (var i=0; i<2000; i++)
    c.attack(t);

  test.assertTrue(t.destroyed, 'things are not destroyed with health 0');
});

tests.add('Magical Objects can be created', function(test) {
  var m = new rpg.MagicalObject(0, 0, 3);

  test.assertTrue(!!m, 'magical object created is not valid');
});

tests.add('Magical Objects have Health', function(test) {
  var m = new rpg.MagicalObject(0, 0, 3);

  test.assertTrue(m.health != undefined, 'magical object has no health');
});

tests.add('The maximum amount of Health is fixed at the time the object is created', function(test) {
  var m = new rpg.MagicalObject(0, 0, 3);

  test.assertEquals(m.maxHealth, 3, 'max health is not correct');
});

tests.add('When reduced to 0 Health, Magical Objects are Destroyed', function(test) {
  var m = new rpg.MagicalObject(0, 0, 3);
  var c = new rpg.Character(0, 0);

  for (var i=0; i<3; i++)
    c.attack(m);

  test.assertTrue(m.destroyed, 'magical object cannot be destroyed');
});

tests.add('Magical Objects cannot be Healed by Characters', function(test) {
  var m = new rpg.MagicalObject(0, 0, 3);
  var c = new rpg.Character(0, 0);

  m.health = 2;
  c.heal(m);

  test.assertEquals(m.health, 2, 'magical object can be healed by character');
});

tests.add('Magical Objects do not belong to Factions; they are neutral', function(test) {
  var m = new rpg.MagicalObject(0, 0, 3);

  test.assertTrue(m.join == undefined, 'magical object can join factions');
});

tests.add('Characters can hold one Magical Object', function(test) {
  var m1 = new rpg.MagicalObject(0, 0, 3);
  var m2 = new rpg.MagicalObject(0, 0, 3);
  var c = new rpg.Character(0, 0);

  test.assertFalse(c.equip == undefined, 'character equip function is not valid');

  c.equip(m1)

  test.assertTrue(c.equipement.indexOf(m1) > -1, 'character cannot hold magical object');

  c.equip(m2);

  test.assertFalse(c.equipement.indexOf(m2) > -1, 'character can hold more than one magical object');
});

tests.run();