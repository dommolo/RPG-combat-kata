var rpg = require('../src/main.js');

function test(item, message) {
  console.log(message);
  console.assert(item, 'fail');
}

c = new rpg.Character();

test(c, 'Characters can be created');
test(c.health == 100, 'New characters have 1000 Health');