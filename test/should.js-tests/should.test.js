
/**
 * Module dependencies.
 */

var should = require('../../')
  , assert = require('assert');

function err(fn, msg) {
  try {
    fn();
    should.fail('expected an error');
  } catch (err) {
    should.equal(msg, err.message);
  }
}

describe('should', function() {
  it('test double require', function() {
    require('../../').should.equal(should);
  });

  it.skip('test assertion', function() {
    'test'.should.be.a.string;
    // This test shows that a subject bleeds in from another
    // instance. I'm quite amazed that anything works so far when I
    // discover this so late. I have no idea why...
    should.equal('foo', 'foo');
  });

  it.skip('test .expected and .actual', function() {
    // Incompatibility: Unexpected error object do not have actual and expected properties
    try {
      'foo'.should.equal('bar');
    } catch (err) {
      assert('foo' == err.actual, 'err.actual');
      assert('bar' == err.expected, 'err.expected');
    }
  });

  it('test chaining', function() {
    var user = { name: 'tj', pets: ['tobi', 'loki', 'jane', 'bandit'] };

    user.should.be.an.instanceOf(Object).and.have.property('name', 'tj');

    user.should.have.ownProperty('name')
      .which.not.have.length(3)
        .and.be.equal('tj');
  });
});
