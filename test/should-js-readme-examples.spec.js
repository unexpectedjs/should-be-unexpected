var expect = require('unexpected');
var should = require('../');

describe('tests based on examples in should.js readme', function () {
    it('Example', function () {
        expect(function () {
            var user = {
                name: 'tj',
                pets: ['tobi', 'loki', 'jane', 'bandit']
            };

            user.should.have.property('name', 'tj');
            user.should.have.property('pets').with.lengthOf(4);
        }, 'not to throw');
    });
});
