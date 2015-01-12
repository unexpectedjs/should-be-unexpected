var expect = require('unexpected');
var should = require('../../');

function err(fn, msg) {
  var ok = true;
  try {
    fn();
    ok = false;
  } catch (err) {
      var errorMessage = err.message.replace(/^\n/, '');
      if (typeof msg === 'string') {
          expect(msg, 'to equal', errorMessage);
      } else if (msg instanceof RegExp) {
          expect(errorMessage, 'to match', msg);
      } else {
        expect.fail('Unexpected error: ' + expect.inspect(err));
      }
  }
  if(!ok) throw new Error('expected an error');
}

exports.err = err;
