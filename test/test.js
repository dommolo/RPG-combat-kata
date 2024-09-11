var rpg = require('../src/main.js');

function test(item, message) {
  console.log(message + ':');
  console.assert(item, 'fail');
}

c = new rpg.Character();

test(c, 'Characters can be created');