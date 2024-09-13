var character = require('./model/Character.js');
var faction = require('./model/Faction.js');
var thing = require('./model/Thing.js');
var magicalObject = require('./model/MagicalObject.js');

module.exports = {
  Character: character.Character,
  Faction: faction.Faction,
  Thing: thing.Thing,
  MagicalObject: magicalObject.MagicalObject
};