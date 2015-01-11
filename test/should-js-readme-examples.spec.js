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

            someAsyncTask(foo, function (err, result) {
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
        describe('.eql(otherValue)', function () {
            it("({ foo: 'bar' }).should.eql({ foo: 'bar' })", function () {
                ({ foo: 'bar' }).should.eql({ foo: 'bar' });
            });
            it('[1,2,3].should.eql([1,2,3])', function () {
                [1,2,3].should.eql([1,2,3]);
            });
            it("[1, 2, 3].should.eql({ '0': 1, '1': 2, '2': 3 }) (!!!)", function () {
                // This will work with to satisfy for this example, but not equal, as they
                // have different constructors. The question here is if we choose to label
                // this an incompatablilty and try to educate people, or we go with the
                // solution that provides the least friction.
                [1, 2, 3].should.eql({ '0': 1, '1': 2, '2': 3 });
            });
            it('.eql does not check object prototypes (!!!)', function () {
                // This fails when .eql is based on to equal, so with this in mind, and the
                // above, I changed it to to satisfy, as that makes them both pass.
                var b = {a: 2};
                var a = Object.create(null);
                a.a = 2;

                b.should.be.eql(a);
            });
            it('.eql should fail with unequal values *', function () {
                expect(function () {
                    [1,2,3].should.eql([1,3,2]);
                }, 'to throw', /^expected \[ 1, 2, 3 \] to satisfy/);
            });
        });
        describe('.equal(otherValue) and .exactly(otherValue)', function () {
            it('(4).should.equal(4)', function () {
                (4).should.equal(4);
            });
            it("'test'.should.equal('test')", function () {
                'test'.should.equal('test');
            });
            it('[1,2,3].should.not.equal([1,2,3])', function () {
                [1,2,3].should.not.equal([1,2,3]);
            });
            it('(4).should.be.exactly(4)', function () {
                (4).should.be.exactly(4);
            });
            it('.equal should throw *', function () {
                expect(function () {
                    (3).should.be.equal(4);
                }, 'to throw', 'expected 3 to be 4');
            });
            it('.exactly should throw *', function () {
                expect(function () {
                    (3).should.be.exactly(4);
                }, 'to throw', 'expected 3 to be 4');
            });
        });
        describe('.startWith(str)', function () {
            it("'foobar'.should.startWith('foo')", function () {
                'foobar'.should.startWith('foo');
            });
            it("'foobar'.should.not.startWith('bar')", function () {
                'foobar'.should.not.startWith('bar');
            });
            it('.startWith should fail *', function () {
                expect(function () {
                    'foobar'.should.not.startWith('foo');
                }, 'to throw', "expected 'foobar' not to match /^foo/\n\nfoobar");
            });
        });
        describe('.endWith(str)', function () {
            it("'foobar'.should.endWith('bar')", function () {
                'foobar'.should.endWith('bar');
            });
            it("'foobar'.should.not.endWith('foo');", function () {
                'foobar'.should.not.endWith('foo');
            });
            it('.endWith should throw', function () {
                expect(function () {
                    'foobar'.should.not.endWith('bar');
                }, 'to throw', 'expected \'foobar\' not to match /bar$/\n\nfoobar');
            });
        });
        describe('.within(from, to)', function () {
            it('user.age.should.be.within(5, 50)', function () {
                var user = { age: 24 };
                user.age.should.be.within(5, 50);
            });
            it('(5).should.be.within(5, 10).and.within(5, 5)', function () {
                (5).should.be.within(5, 10).and.within(5, 5)
            });
            it('.within * ', function () {
                expect(function () {
                    (3).should.be.within(1,2);
                }, 'to throw', "expected 3 to be within '1..2'");
            });
        });
        describe('.approximately(num, delta)', function () {
            it('(99.99).should.be.approximately(100, 0.1)', function () {
                (99.99).should.be.approximately(100, 0.1);
            });
            it('.approximately *', function () {
                expect(function () {
                    (99).should.be.approximately(100, 0.1);
                }, 'to throw', 'expected 99 to be close to 100 (epsilon: 1e-1)');
            });
        });
        describe('.above(num) and .greaterThan(num)', function () {
            var user = { age: 24 };
            it('user.age.should.be.above(5)', function () {
                user.age.should.be.above(5);
            });
            it('user.age.should.not.be.above(100)', function () {
                user.age.should.not.be.above(100);
            });
            it('(5).should.be.above(0)', function () {
                (5).should.be.above(0);
            });
            it('(5).should.not.be.above(5)', function () {
                (5).should.not.be.above(5);
            });
            it('(5).should.not.be.greaterThan(5)', function () {
                (5).should.not.be.greaterThan(5);
            });
            it('(5).should.be.greaterThan(0)', function () {
                (5).should.be.greaterThan(0);
            });
            it('.greaterThan should fail *', function () {
                expect(function () {
                    (5).should.be.greaterThan(6);
                }, 'to throw', 'expected 5 to be greater than 6');
            });
        });
        describe('.below(num) and .lessThan(num)', function () {
            var user = { age: 24 };
            it('user.age.should.be.below(100)', function () {
                user.age.should.be.below(100);
            });
            it('user.age.should.not.be.below(5)', function () {
                user.age.should.not.be.below(5);
            });
            it('(5).should.be.below(6)', function () {
                (5).should.be.below(6);
            });
            it('(5).should.not.be.below(5)', function () {
                (5).should.not.be.below(5);
            });
            it('(5).should.be.lessThan(6)', function () {
                (5).should.be.lessThan(6);
            });
            it('(5).should.not.be.lessThan(5)', function () {
                (5).should.not.be.lessThan(5);
            });
            it('.lessThan should throw *', function () {
                expect(function () {
                    (5).should.not.be.lessThan(6);
                }, 'to throw', 'expected 5 not to be less than 6');
            });
        });
    });
});
