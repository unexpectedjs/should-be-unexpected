var err = require('../util').err;
var should = require('../../../');

describe('string', function() {
  it('test startWith()', function() {
    'foobar'.should.startWith('foo');
    'foobar'.should.not.startWith('bar');

    err(function() {
      'foobar'.should.startWith('bar');
    }, "expected 'foobar' to match /^bar/");
    // }, "expected 'foobar' to start with 'bar'");

    err(function() {
      'foobar'.should.not.startWith('foo');
  }, "expected 'foobar' not to match /^foo/\n\nfoobar\n^^^");
    // }, "expected 'foobar' not to start with 'foo'");

    // Incompatibility! Custom Error messages.
    err(function() {
      'foobar'.should.startWith('bar', 'baz');
    }, "expected 'foobar' to match /^bar/");
    // }, "baz");

    // Incompatibility! Custom Error messages.
    err(function() {
      'foobar'.should.not.startWith('foo', 'baz');
  }, "expected 'foobar' not to match /^foo/\n\nfoobar\n^^^");
    // }, "baz");
  });

  it('test endWith()', function() {
    'foobar'.should.endWith('bar');
    'foobar'.should.not.endWith('foo');

    err(function() {
      'foobar'.should.endWith('foo');
    }, "expected 'foobar' to match /foo$/");
    // }, "expected 'foobar' to end with 'foo'");

    err(function() {
      'foobar'.should.not.endWith('bar');
  }, "expected 'foobar' not to match /bar$/\n\nfoobar\n   ^^^");
    // }, "expected 'foobar' not to end with 'bar'");

    // Incompatibility! Custom Error messages.
    err(function() {
      'foobar'.should.endWith('foo', 'baz');
    }, "expected 'foobar' to match /foo$/");
    // }, "baz");

    // Incompatibility! Custom Error messages.
    err(function() {
      'foobar'.should.not.endWith('bar', 'baz');
  }, "expected 'foobar' not to match /bar$/\n\nfoobar\n   ^^^");
    // }, "baz");
  });

});
