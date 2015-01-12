var expect = require('unexpected');
var should = require('../');

/* These tests are adapted from the examples in the should.js readme.
 * Negative tests are added to make sure they throw when failing,
 * for completeness sake. The additions are marked with an asterisk (*)
 * at the end of the name.
 *
 * Incompatabilities are marked with three exclamation marks. (!!!)
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
                // INCOMPATABILITY: SEE DOCUMENTATION
                expect(function () {
                    [1, 2, 3].should.eql({ '0': 1, '1': 2, '2': 3 });
                }, 'to throw', "expected [ 1, 2, 3 ] to equal { '0': 1, '1': 2, '2': 3 }\n\nMismatching constructors Array should be Object");
            });
            it.skip('.eql does not check object prototypes (!!!)', function () {
                // Fails due to a bug in unexpected when inspecting
                // Objects created by Object.create(null)

                // INCOMPATABILITY: SEE DOCUMENTATION
                var b = {a: 2};
                var a = Object.create(null);
                a.a = 2;
                expect(function () {
                    b.should.be.eql(a);
                }, 'to throw', '');
            });
            it('.eql should fail with unequal values *', function () {
                expect(function () {
                    [1,2,3].should.eql([1,3,2]);
                }, 'to throw', /^expected \[ 1, 2, 3 \] to equal/);
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
        describe('.NaN', function () {
            it('(undefined + 0).should.be.NaN', function () {
                (undefined + 0).should.be.NaN;
            });
            it('(0).should.not.be.NaN', function () {
                (0).should.not.be.NaN;
            });
            it('.NaN should throw *', function () {
                expect(function () {
                    (0).should.be.NaN;
                }, 'to throw', 'expected 0 to be NaN');
            });
        });
        describe('.Infinity', function () {
            it('(1/0).should.be.Infinity', function () {
                (1/0).should.be.Infinity;
            });
            it('.Infinity should throw *', function () {
                expect(function () {
                    (1).should.be.Infinity;
                }, 'to throw', 'expected 1 to be infinite');
            });
        });
        describe('.type(str)', function () {
            it("user.should.be.type('object')", function () {
                var user = {};
                user.should.be.type('object');
            });
            it("'test'.should.be.type('string')", function () {
                'test'.should.be.type('string');
            });
            it('.type should throw *', function () {
                expect(function () {
                    'foo'.should.be.type('number');
                }, 'to throw', "expected 'foo' to be a number");
            });
        });
        describe('.instanceof(constructor) and .instanceOf(constructor)', function () {
            // This assertion uses 'to be a'. That means that an Array will incorrectly
            // be called "a Array".
            it('user.should.be.an.instanceof(User)', function () {
                function User () {};
                var user = new User();
                user.should.be.an.instanceof(User);
            });
            it('[].should.be.an.instanceOf(Array)', function () {
                [].should.be.an.instanceOf(Array);
            });
            it('.instanceof should throw *', function () {
                expect(function () {
                    'true'.should.be.an.instanceof(Boolean);
                }, 'to throw', "expected 'true' to be a Boolean");
            });
        });
        describe('.arguments', function () {
            it('args.should.be.arguments', function () {
                var args = (function(){ return arguments; })(1,2,3);
                args.should.be.arguments;
            });
            it('[].should.not.be.arguments', function () {
                [].should.not.be.arguments;
            });
            it('.arguments should throw *', function () {
                expect(function () {
                    [].should.be.arguments;
                }, 'to throw', 'expected [] to be an arguments');
            });
        });
        describe('.Object, .Number, .Array, .Boolean, .Function, .String, .Error', function () {
            it('({}).should.be.an.Object', function () {
                ({}).should.be.an.Object;
            });
            it('(1).should.be.a.Number', function () {
                (1).should.be.a.Number;
            });
            it('[].should.be.an.Array.and.an.Object', function () {
                [].should.be.an.Array.and.an.Object;
            });
            it('(true).should.be.a.Boolean', function () {
                (true).should.be.a.Boolean;
            });
            it("'.should.be.a.String", function () {
                ''.should.be.a.String;
            });
            it('(function () {}).should.be.a.Function *', function () {
                (function () {}).should.be.a.Function;
            });
            it('(new Error()).should.be.an.Error *', function () {
                (new Error()).should.be.an.Error;
            });
            it('.Number should throw *', function () {
                expect(function () {
                    'string'.should.be.a.Number;
                }, 'to throw', "expected 'string' to be a number");
            });
        });
        describe.skip('.enumerable(name[, value])', function () {
            var user = {
                name: 'Gustav',
                age: 15,
            };
            it.skip("'asd'.should.not.have.enumerable('0');", function () {
                'asd'.should.not.have.enumerable('0');
            });
            it("user.should.have.enumerable('name');", function () {
                user.should.have.enumerable('name');
            });
            it("user.should.have.enumerable('age', 15);", function () {
                user.should.have.enumerable('age', 15);
            });
            it("user.should.not.have.enumerable('rawr');", function () {
                user.should.not.have.enumerable('rawr');
            });
            it("user.should.not.have.enumerable('age', 0);", function () {
                user.should.not.have.enumerable('age', 0);
            });
            it("[1, 2].should.have.enumerable('0', 1);", function () {
                [1, 2].should.have.enumerable('0', 1);
            });
            it("[1, 2].should.have.enumerable('length');", function () {
                [1, 2].should.not.have.enumerable('length');
            });
        });
        describe('.property(name[, value])', function () {
            var user = {
                name: 'Gustav',
                age: 15,
            };
            it("user.should.have.property('name')", function () {
                user.should.have.property('name');
            });
            it("user.should.have.property('age', 15)", function () {
                user.should.have.property('age', 15);
            });
            it("user.should.not.have.property('rawr')", function () {
                user.should.not.have.property('rawr');
            });
            it("user.should.not.have.property('age', 0)", function () {
                user.should.not.have.property('age', 0);
            });
            it("[1, 2].should.have.property('0', 1)", function () {
                [1, 2].should.have.property('0', 1);
            });
            it(".property changes the chain's object to the given property's value *", function () {
                ({ foo: 'bar' }).should.have.property('foo').which.is.a.String;
            });
            it('.property should fail *', function () {
                expect(function () {
                    user.should.have.property('rawr');
                }, 'to throw', "expected { name: 'Gustav', age: 15 } to have property 'rawr'");
            });
        });
        describe('.properties(...)', function () {
            var user = {
                name: 'denis',
                age: 24
            };
            it("user.should.have.properties('name', 'age')", function () {
                user.should.have.properties('name', 'age');
            });
            it("user.should.have.properties(['name', 'age'])", function () {
                user.should.have.properties(['name', 'age']);
            });
            it("user.should.have.properties({ name: 'denis', age: 24 });", function () {
                user.should.have.properties({
                    name: 'denis',
                    age: 24
                });
            });
            it('.properties should fail', function () {
                expect(function () {
                    user.should.have.properties('foo', 'bar');
                }, 'to throw', "expected { name: 'denis', age: 24 } to have properties [ 'foo', 'bar' ]");
            });
        });
        describe('.length(number) and .lengthOf(number)', function () {
            var user = {
                pets: ['tobi', 'loki', 'jane', 'bandit', 'garfield']
            };
            it('user.pets.should.have.length(5)', function () {
                user.pets.should.have.length(5);
            });
            it('user.pets.should.have.a.lengthOf(5)', function () {
                user.pets.should.have.a.lengthOf(5);
            });
            it('({ length: 10}).should.have.length(10)', function () {
                ({ length: 10}).should.have.length(10);
            });
            it(".lengthOf change the chain's object to the given length value", function () {
                [1,2,3].should.have.length(3).and.be.a.Number;
            });
            it('.length should throw *', function () {
                expect(function () {
                    user.pets.should.have.length(42);
                }, 'to throw', "expected [ 'tobi', 'loki', 'jane', 'bandit', 'garfield' ] to have length 42");
            });
        });
        describe('.ownProperty(str) and .hasOwnProperty(str)', function () {
            it("({ foo: 'bar' }).should.have.ownProperty('foo').equal('bar')", function () {
                ({ foo: 'bar' }).should.have.ownProperty('foo').equal('bar');
            });
            it("({ foo: 'bar' }).should.have.hasOwnProperty('foo') *", function () {
                ({ foo: 'bar' }).should.have.hasOwnProperty('foo');
            });
            it('.ownProperty should throw *', function () {
                expect(function () {
                    var obj = Object.create({ foo: 'bar' });
                    obj.should.have.ownProperty('foo');
                }, 'to throw', "expected {} to have own property 'foo'");
            });
        });
        describe('.empty', function () {
            it('[].should.be.empty', function () {
                [].should.be.empty;
            });
            it("''.should.be.empty", function () {
                ''.should.be.empty;
            });
            it('({}).should.be.empty', function () {
                ({}).should.be.empty;
            });
            it('arguments.should.be.empty', function () {
                (function() {
                    arguments.should.be.empty;
                })();
            });
            it('.empty should fail *', function () {
                expect(function () {
                    [1].should.be.empty;
                }, 'to throw', 'expected [ 1 ] to be empty');
            });
        });
        describe('.keys([key1, key2, ...]) and .keys(key1, key2, ...) and .key(key)', function () {
            var obj = { foo: 'bar', baz: 'raz' };
            it("obj.should.have.keys('foo', 'baz')", function () {
                obj.should.have.keys('foo', 'baz');
            });
            it("obj.should.have.keys(['foo', 'baz'])", function () {
                obj.should.have.keys(['foo', 'baz']);
            });
            it('({}).should.have.keys()', function () {
                ({}).should.have.keys();
            });
            it("should fail: ({}).should.have.keys('key')", function () {
                //fail AssertionError: expected {} to have key 'key'missing keys: 'key'
                expect(function () {
                    ({}).should.have.keys('key');
                }, 'to throw', 'expected {} to have keys \'key\'')
            });
        });
        describe.skip('.propertyByPath([name1, ...]) or .propertyByPath(name1, name2, ...)', function () {
            // This could be implemented by recursively applying .property
            // exploiting the fact that it already chains and changes the
            // subject. But it will provide worse errors.
            // Can it be implemented with to satisfy?
            var obj = { foo: 'bar', baz: 'raz', zad: { a: 10 } };
            it("obj.should.have.propertyByPath('zad', 'a')", function () {
                obj.should.have.propertyByPath('zad', 'a');
            });
            it('obj.should.not.have.propertyByPath(0, 1, 2)', function () {
                obj.should.not.have.propertyByPath(0, 1, 2);
            });
            it(".propertyByPath changes the chain's object to the given property's value if found *", function () {
                obj.should.have.propertyByPath('zad', 'a').which.is.a.Number;
            });
            it(".propertyByPath should fail *", function () {
                expect(function () {
                    obj.should.have.propertyByPath('zad', 'b');
                }, 'to throw', '');
            });
        });
        describe('.containEql(otherValue)', function () {
            it("'hello boy'.should.containEql('boy')", function () {
                'hello boy'.should.containEql('boy');
            });
            it('[1,2,3].should.containEql(3)', function () {
                [1,2,3].should.containEql(3);
            });
            it('[[1],[2],[3]].should.containEql([3])', function () {
                [[1],[2],[3]].should.containEql([3]);
            });
            it('[[1],[2],[3, 4]].should.not.containEql([3])', function () {
                [[1],[2],[3, 4]].should.not.containEql([3]);
            });
            it('({ b: 10 }).should.containEql({ b: 10 }) (!!!)', function () {
                // This fails as contains is not defined for objects in unexpected.
                expect(function () {
                    ({ b: 10 }).should.containEql({ b: 10 });
                }, 'to throw', 'The assertion "to contain" is not defined for the type "object",\nbut it is defined for these types: "string", "arrayLike"');
            });
            it('([1, 2, { a: 10 }]).should.containEql({ a: 10 })', function () {
                ([1, 2, { a: 10 }]).should.containEql({ a: 10 });
            });
            it('[1, 2, 3].should.not.containEql({ a: 1 })', function () {
                [1, 2, 3].should.not.containEql({ a: 1 });
            });
            it("[{a: 'a'}, {b: 'b', c: 'c'}].should.containEql({a: 'a'})", function () {
                [{a: 'a'}, {b: 'b', c: 'c'}].should.containEql({a: 'a'});
            });
            it("[{a: 'a'}, {b: 'b', c: 'c'}].should.not.containEql({b: 'b'})", function () {
                [{a: 'a'}, {b: 'b', c: 'c'}].should.not.containEql({b: 'b'});
            });
            it('.containEql should throw *', function () {
                expect(function () {
                    [1,2,3].should.containEql(4);
                }, 'to throw', 'expected [ 1, 2, 3 ] to contain 4');
            });
        });
        describe.skip('.containDeep(otherValue)', function () {
            it("'hello boy'.should.containDeep('boy')", function () {
                'hello boy'.should.containDeep('boy');
            });
            it('[1,2,3].should.containDeep([3])', function () {
                [1,2,3].should.containDeep([3]);
            });
            it('[1,2,3].should.containDeep([1, 3])', function () {
                [1,2,3].should.containDeep([1, 3]);
            });
            it('[1,2,3].should.not.containDeep([3, 1])', function () {
                [1,2,3].should.not.containDeep([3, 1]);
            });
            it('complex objects .containDeep', function () {
                ({ a: { b: 10 }, b: { c: 10, d: 11, a: { b: 10, c: 11} }}).should
                    .containDeep({ a: { b: 10 }, b: { c: 10, a: { c: 11 }}});
            });
            it('[1, 2, 3, { a: { b: { d: 12 }}}].should.containDeep([{ a: { b: {d: 12}}}])', function () {
                [1, 2, 3, { a: { b: { d: 12 }}}].should.containDeep([{ a: { b: {d: 12}}}]);
            });
            it('[[1],[2],[3]].should.containDeep([[3]])', function () {
                [[1],[2],[3]].should.containDeep([[3]]);
            });
            it('[[1],[2],[3, 4]].should.containDeep([[3]])', function () {
                [[1],[2],[3, 4]].should.containDeep([[3]]);
            });
            it("[{a: 'a'}, {b: 'b', c: 'c'}].should.containDeep([{a: 'a'}])", function () {
                [{a: 'a'}, {b: 'b', c: 'c'}].should.containDeep([{a: 'a'}]);
            });
            it("[{a: 'a'}, {b: 'b', c: 'c'}].should.containDeep([{b: 'b'}])", function () {
                [{a: 'a'}, {b: 'b', c: 'c'}].should.containDeep([{b: 'b'}]);
            });
        });
        describe.skip('.match(otherValue)', function () {
            describe('Given: String, otherValue: regexp', function () {
                it('username.should.match(/^\w+$/)', function () {
                    var username = 'foo';
                    username.should.match(/^\w+$/);
                });
            });
            describe('Given: Array, otherValue: regexp  - assert each value match to regexp.', function () {
                it("['a', 'b', 'c'].should.match(/[a-z]/)", function () {
                    ['a', 'b', 'c'].should.match(/[a-z]/);
                });
                it("['a', 'b', 'c'].should.not.match(/[d-z]/)", function () {
                    ['a', 'b', 'c'].should.not.match(/[d-z]/);
                });
            });
            describe("Given: Object, otherValue: regexp - assert own property's values to match regexp.", function () {
                it("({ a: 'foo', c: 'barfoo' }).should.match(/foo$/)", function () {
                    ({ a: 'foo', c: 'barfoo' }).should.match(/foo$/);
                });
                it("({ a: 'a' }).should.not.match(/^http/)", function () {
                    ({ a: 'a' }).should.not.match(/^http/);
                });
            });
            describe('Given: Anything, otherValue: function - assert if given value matched to function.', function () {
                // Function can use .should inside or return 'true' or
                // 'false', in all other cases it do nothing. If you
                // return value that return assertion, you will
                // receive better error messages.
                it('(5).should.match(function(n) { return n > 0', function () {
                    (5).should.match(function(n) { return n > 0; });
                });
                it('(5).should.not.match(function(n) { return n < 0', function () {
                    (5).should.not.match(function(n) { return n < 0; });
                });
                it('(5).should.not.match(function(it) { it.should.be.an.Array', function () {
                    (5).should.not.match(function(it) { it.should.be.an.Array; });
                });
                it('(5).should.match(function(it) { return it.should.be.a.Number', function () {
                    (5).should.match(function(it) { return it.should.be.a.Number; });
                });
            });
            describe('Given: object, otherValue: another object - assert that object properties match to properties of another object in meaning that describe above cases.', function () {
                it('Complex object example with match #1', function () {
                    ({ a: 10, b: 'abc', c: { d: 10 }, d: 0 }).should
                        .match({ a: 10, b: /c$/, c: function(it) { return it.should.have.property('d', 10); }});
                });
                it('Complex object example with match #2', function () {
                    [10, 'abc', { d: 10 }, 0].should
                        .match({ '0': 10, '1': /c$/, '2': function(it) { return it.should.have.property('d', 10); } });
                });
                it('Complex object example with match #3', function () {
                    [10, 'abc', { d: 10 }, 0].should
                        .match([10, /c$/, function(it) { return it.should.have.property('d', 10); }]);
                });
            });
        });
        describe.skip('.matchEach()', function () {
            describe('If otherValue is RegExp, then each property value checked to match it', function () {
                it("(['a', 'b', 'c']).should.matchEach(/[a-c]/)", function () {
                    (['a', 'b', 'c']).should.matchEach(/[a-c]/);
                });
            });
            describe('If otherValue is Function, then check each property value and key matched it', function () {
                it('[10, 11, 12].should.matchEach(function(it) { return it >= 10', function () {
                    [10, 11, 12].should.matchEach(function(it) { return it >= 10; });
                });
                it('[10, 11, 12].should.matchEach(function(it) { return it >= 10', function () {
                    [10, 11, 12].should.matchEach(function(it) { return it >= 10; });
                });
            });
            describe('In other cases it checks that each property value is .eql to otherValue', function () {
                it('[10, 10].should.matchEach(10)', function () {
                    [10, 10].should.matchEach(10);
                });
            });
        });
    });
});
