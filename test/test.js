var rpg = require('../src/main.js');

function test(item, message) {
  console.log(message);
  console.assert(item, 'fail');
}

c = new rpg.Character();

test(c, 'Characters can be created');
test(c.health == 100, 'New characters have 1000 Health');
test(c.level == 1, 'New characters start from level 1');
test(c.alive !== undefined, 'Characters can be Alive or Dead');
test(c.alive, 'New characters are Alive');