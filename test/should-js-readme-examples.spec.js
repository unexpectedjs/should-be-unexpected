var expect = require('unexpected');
var should = require('../');

describe('should.js readme:', function () {
    describe('Example:', function () {
        it('first example', function () {
            expect(function () {
                var user = {
                    name: 'tj',
                    pets: ['tobi', 'loki', 'jane', 'bandit']
                };

                user.should.have.property('name', 'tj');
                user.should.have.property('pets').with.lengthOf(4);
            }, 'not to throw');
        });
        it('Object.create(null)', function () {
            expect(function () {
                var user = Object.create(null);
                should(user).have.property('name', 'tj');
            }, 'to throw', 'expected {} to have property \'name\', \'tj\'');
        });
        it('Testing for null\'s', function () {
            expect(function () {
                should(null).not.be.ok;
            }, 'not to throw');
        });
        it('someAsyncTask', function (done) {
            var foo = 'foobar';

            var someAsyncTask = function (value, callback) {
                return setTimeout(function () {
                    return callback(null, {
                        bar: value
                    });
                }, 1);
            };

            someAsyncTask(foo, function(err, result){
                should.not.exist(err);
                should.exist(result);
                result.bar.should.equal(foo);
                done();
            });
        });
    });
    describe('Assertions:', function () {
        describe('.ok', function () {
            it('true.should.be.ok', function () {
                true.should.be.ok;
            });
            it("'yay'.should.be.ok", function () {
                'yay'.should.be.ok;
            });
            it('(1).should.be.ok', function () {
                (1).should.be.ok;
            });
            it('({}).should.be.ok', function () {
                ({}).should.be.ok;
            });
            it('false.should.not.be.ok', function () {
                false.should.not.be.ok;
            });
            it("''.should.not.be.ok", function () {
                ''.should.not.be.ok;
            });
            it('(0).should.not.be.ok', function () {
                (0).should.not.be.ok;
            });
            it('No assertions can be performed on null and undefined', function () {
                expect(function () {
                    undefined.should.not.be.ok;
                }, 'to throw', 'Cannot read property \'should\' of undefined');
            });
        });

    });
});
