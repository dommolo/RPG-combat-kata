var colorYellow = '\x1b[33m';
var colorRed = '\x1b[31m';
var colorGreen = '\x1b[32m';
var colorReset = '\x1b[0m';

function Tester() {
  this.tests = [];

  this.add = function (name, testFunction) {
    this.tests.push(new Test(name, testFunction));
  };

  this.run = function () {
    for (var i in this.tests)
      this.tests[i].execute();
  };
}

function Test(name, testFunction) {
  this.name = name;
  this.testFunction = testFunction;
  this.assertions = [];
  this.ok = 0;
  this.fail = 0;

  this.assertTrue = function (item, failMessage) {
    this.assertions.push(function () {
      if (!item) {
        console.error(this.name + ' fail: ' + failMessage);
        console.debug('Value is not true');
        this.fail++;
      } else
        this.ok++;
    }.bind(this));
  };

  this.assertFalse = function (item, failMessage) {
    this.assertions.push(function () {
      if (item) {
        console.error(this.name + ' fail: ' + failMessage);
        console.debug('Value is not false');
        this.fail++;
      } else
        this.ok++;
    }.bind(this));
  };

  this.assertEquals = function (expected, actual, failMessage) {
    this.assertions.push(function () {
      var out = expected == actual;

      if (!out) {
        console.error('\t' + colorYellow + 'fail: ' + failMessage);
        console.debug('\t- expected value: ' + expected + ', actual value: ' + actual + colorReset);
        this.fail++;
      } else
        this.ok++;
    }.bind(this));
  };

  this.execute = function () {
    console.log('- Executing: ' + this.name);

    this.testFunction(this);

    for (var i in this.assertions)
      this.assertions[i](this);

    var outMessage = '  ' + this.assertions.length + ' assertions: ';
    
    if (this.ok > 0)
      outMessage += colorGreen + this.ok + ' success ';
    if (this.fail > 0)
      outMessage += colorRed + this.fail + ' fail ';

    outMessage += colorReset;

    console.log(outMessage);
  };
}

module.exports = {
  Tester: Tester
};