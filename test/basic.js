var expect = require('unexpected');
var should = require('../');


describe('basic', function () {
    it('should export a function', function () {
        expect(should, 'to be a function');
    });
});
