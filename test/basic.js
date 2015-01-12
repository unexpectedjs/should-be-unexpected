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
        expect(function () {
            (3).should.not.eql(3);
        }, 'to throw', 'expected 3 not to equal 3');
    });
    it("({ foo: 'bar' }).should.have.property('foo')", function () {
        ({ foo: 'bar' }).should.have.property('foo');
        expect(function () {
            ({ foo: 'bar' }).should.have.property('bar');
        }, 'to throw', "expected { foo: 'bar' } to have property 'bar'");
    });
    it('true.should.be.ok', function () {
        true.should.be.ok;
        false.should.not.be.ok;

        expect(function () {
            true.should.not.be.ok;
        }, 'to throw', "expected true not to be ok");
    });
    it('(3).should.be.a.Number', function () {
        (3).should.be.a.Number;
        (3).should.be.a.Number.and.eql(3);
        expect(function () {
            'Not a Number'.should.be.a.Number;
        }, 'to throw', "expected 'Not a Number' to be a number");
    });
});
