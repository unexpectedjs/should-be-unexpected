var expect = require('unexpected');
var should = require('../');

/* These tests are adapted from the examples in the should.js readme.
 * Negative tests are added to make sure they throw when failing,
 * for completeness sake. The additions are marked with an asterisk (*)
 * at the end of the name.
 */

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
            it('In order to test for null', function () {
                var err = null;
                (err === null).should.be.ok;
            });
            it('false.should.be.ok should throw *', function () {
                expect(function () {
                    false.should.be.ok;
                }, 'to throw', 'expected false to be ok');
            });
        });
        describe('.true', function () {
            it('true.should.be.true', function () {
                true.should.be.true;
            });
            it("'1'.should.not.be.true", function () {
                '1'.should.not.be.true;
            });
            it('false.should.be.true should throw *', function () {
                expect(function () {
                    false.should.be.true;
                }, 'to throw');
            });
        });
        describe('.false', function () {
            it('false.should.be.false', function () {
                false.should.be.false;
            });
            it('(0).should.not.be.false', function () {
                (0).should.not.be.false;
            });
            it('true.should.be.false should throw *', function () {
                expect(function () {
                    true.should.be.false;
                }, 'to throw');
            });
        });
    });
});
