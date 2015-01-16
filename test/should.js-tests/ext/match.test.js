var err = require('../util').err;
var should = require('../../../');

describe('match', function() {

  it('test string match(regexp)', function() {
    'foobar'.should.match(/^foo/);
    'foobar'.should.not.match(/^bar/);

    err(function() {
      'foobar'.should.match(/^bar/i)
    }, "expected 'foobar' to match /^bar/i");

    err(function() {
      'foobar'.should.not.match(/^foo/i)
    }, "expected 'foobar' not to match /^foo/i\n\nfoobar");

    err(function() {
      'foobar'.should.match(/^bar/i, 'foo')
    }, "foo");

    err(function() {
      'foobar'.should.not.match(/^foo/i, 'foo')
    }, "foo");
  });

  it('test object match(regexp)', function() {
    ({ a: 'foo', c: 'barfoo' }).should.match(/foo$/);

    ({ a: 'a' }).should.not.match(/^http/);

    // positive false
    err(function() {
      ({ a: 'foo', c: 'barfoo' }).should.not.match(/foo$/);
    }, "expected { a: 'foo', c: 'barfoo' } not to satisfy { a: /foo$/, c: /foo$/ }");
    //}, "expected { a: 'foo', c: 'barfoo' } not to match /foo$/\n    matched properties: a, c");

    // negative true
    err(function() {
      ({ a: 'foo', c: 'barfoo' }).should.match(/^foo$/);
    }, [
      "expected { a: 'foo', c: 'barfoo' } to satisfy { a: /^foo$/, c: /^foo$/ }",
      "",
      "{",
      "  a: 'foo',",
      "  c: 'barfoo' // should match /^foo$/",
      "}"
    ].join('\n'));
    //}, "expected { a: 'foo', c: 'barfoo' } to match /^foo$/\n    not matched properties: c ('barfoo')\n    matched properties: a");
  });

  it('test array match(regexp)', function() {
    ['a', 'b', 'c'].should.match(/[a-z]/);
    ['a', 'b', 'c'].should.not.match(/[d-z]/);

    err(function() {
      ['a', 'b', 'c'].should.not.match(/[a-z]/);
    }, [
      "failed expectation in [ 'a', 'b', 'c' ]:",
      "  0: expected 'a' not to match /[a-z]/",
      "  1: expected 'b' not to match /[a-z]/",
      "  2: expected 'c' not to match /[a-z]/"
    ].join('\n'));
    //}, "expected [ 'a', 'b', 'c' ] not to match /[a-z]/");

    err(function() {
      ['a', 'b', 'c'].should.match(/[d-z]/);
    }, [
      "failed expectation in [ 'a', 'b', 'c' ]:",
      "  0: expected 'a' to match /[d-z]/",
      "  1: expected 'b' to match /[d-z]/",
      "  2: expected 'c' to match /[d-z]/"
    ].join('\n'));
    //}, "expected [ 'a', 'b', 'c' ] to match /[d-z]/");
  });

  it('test match(function)', function() {
    (5).should.match(function(n) {
      return n > 0;
    });

    (5).should.not.match(function(n) {
      return n < 0;
    });

    (5).should.not.match(function(it) {
      it.should.be.an.Array;
    });

    (5).should.match(function(it) {
      it.should.be.a.Number;
    });

    err(function() {
      (5).should.match(function(n) {
        return n < 0;
      });
    }, "expected 5 to match [Function]");

    err(function() {
      (5).should.match(function(it) {
        it.should.be.an.Array;
      });
    }, "expected 5 to match [Function]\n    expected 5 to be an array");

    err(function() {
      (5).should.not.match(function(it) {
        return it.should.be.a.Number;
      });
    }, "expected 5 not to match [Function]\n    expected 5 to be a number");

    err(function() {
      (5).should.not.match(function(n) {
        return n > 0;
      });
    }, "expected 5 not to match [Function]");
  });

  it('test match(object)', function() {
    ({ a: 10, b: 'abc', c: { d: 10 }, d: 0 }).should
      .match({ a: 10, b: /c$/, c: function(it) {
        return it.should.have.property('d', 10);
      }});

    [10, 'abc', { d: 10 }, 0].should
      .match({ '0': 10, '1': /c$/, '2': function(it) {
        return it.should.have.property('d', 10);
      } });

    [10, 'abc', { d: 10 }, 0].should
      .match([10, /c$/, function(it) {
        return it.should.have.property('d', 10);
      }]);

    err(function() {
      ({ a: 10, b: 'abc', c: { d: 10 }, d: 0 }).should
        .match({ a: 11, b: /c$/, c: function(it) {
          return it.should.have.property('d', 10);
        }});
    }, "expected { a: 10, b: 'abc', c: { d: 10 }, d: 0 } to match { a: 11, b: /c$/, c: [Function] }\n    not matched properties: a (10)\n    matched properties: b, c");

    err(function() {
      ({ a: 10, b: 'abc', c: { d: 10 }, d: 0 }).should.not
        .match({ a: 10, b: /c$/, c: function(it) {
          return it.should.have.property('d', 10);
        }});
    }, "expected { a: 10, b: 'abc', c: { d: 10 }, d: 0 } not to match { a: 10, b: /c$/, c: [Function] }\n    matched properties: a, b, c");
  });

  it('test each property match(function)', function() {
    [10, 11, 12].should.matchEach(function(it) {
      return it >= 10;
    });

    [10, 10].should.matchEach(10);

    ({ a: 10, b: 11, c: 12}).should.matchEach(function(value, key) {
      value.should.be.a.Number;
    });

    (['a', 'b', 'c']).should.matchEach(/[a-c]/);

    err(function() {
      (['a', 'b', 'c']).should.not.matchEach(/[a-c]/);
    }, "expected [ 'a', 'b', 'c' ] not to match each /[a-c]/");

    err(function() {
      [10, 11].should.matchEach(10);
    }, "expected [ 10, 11 ] to match each 10");
  });
});
