var expect = require('unexpected');
var should = require('../');


describe('basic', function () {
    it('should export a function', function () {
        expect(should, 'to be a function');
    });
    it('foo.should.be.eql(bar)', function () {
    	should(3).be.eql(3);
		should(3).be.eql(3);
    	should(3).not.be.eql(4);
    });
    it("({ foo: 'bar' }).should.have.property('foo')", function () {
    	({ foo: 'bar' }).should.have.property('foo');
    });
    it("({ foo: 'bar' }).should.have.property('foo').and.not.have.property('bar');", function () {
    	({ foo: 'bar' }).should.have.property('foo').and.not.have.property('bar');
    });
    it('true.should.be.ok', function () {
    	true.should.be.ok;
    	false.should.not.be.ok;
    });
});
