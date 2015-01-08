var expect = require('unexpected');
var should = require('../');


describe('basic', function () {
    it('should export a function', function () {
        expect(should, 'to be a function');
    });
    it('foo.should.be(bar)', function () {
    	should(3).be(3);
		should(3).be(3);
    	should(3).not.be(3);
    });
});
