var expect = require('unexpected');
var should = require('../');


describe('basic', function () {
    it('should export a function', function () {
        expect(should, 'to be a function');
    });
    it('foo.should.be(bar)', function () {
    	should(3).be(3);
		should(3).be(3);
    	should(3).not.be(4);
    });
    it("({ foo: 'bar' }).should.have.property('foo')", function () {
    	({ foo: 'bar' }).should.have.property('foo');
    });
    it("({ foo: 'bar' }).should.have.property('foo').and.not.have.property('bar');", function () {
    	({ foo: 'bar' }).should.have.property('foo').and.not.have.property('bar');
    });
});
