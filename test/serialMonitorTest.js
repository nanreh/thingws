var assert = require('assert');

const serialMonitor = require("../lib/serialMonitor");

describe('SerialMonitor', function() {
  describe('#constructor()', function() {
    it('should default to empty exclude list', function() {
      let sm = new serialMonitor.SerialMonitor( {autoStart: false });
      assert.equal(0, sm.excludes.size);
    });
    it('should apply provided exclude list', function() {
      let sm = new serialMonitor.SerialMonitor( { portsToExclude: ['/dev/tty.thingOne', '/dev/tty.thingTwo'], autoStart: false });
      assert.ok(sm.excludes.has('/dev/tty.thingOne'));
      assert.ok(sm.excludes.has('/dev/tty.thingTwo'));
    });
  });
});

// TODO more tests
