var expect = require('unexpected');
var expandFlags = require('./util/expandFlags');

module.exports = {
    methodAssertions: {
        eql: '[not] to equal',
        equal: '[not] to be',
        exactly: '[not] to be',
        startWith: function (value) {
            var regex = new RegExp('^' + value);
            return this.unexpectedAssert('[not] to match', [regex]);
        },
        endWith: function (value) {
            var regex = new RegExp('' + value + '$');
            return this.unexpectedAssert('[not] to match', [regex]);
        },
        within: '[not] to be within',
        approximately: '[not] to be close to',
        above: '[not] to be above',
        greaterThan: '[not] to be greater than',
        below: '[not] to be below',
        lessThan: '[not] to be less than',
        type: '[not] to be a',
        containEql: '[not] to contain',
        instanceof: '[not] to be a',
        instanceOf: '[not] to be a',
        property: function () {
            this.unexpectedAssert('[not] to have property', arguments);
            // change the subject to the value of the asserted property
            this.subject = this.subject[arguments[0]];
            return this;
        },
        properties: function () {
            var args = arguments;
            if (arguments.length > 1) {
                args = [Array.prototype.slice.call(args)];
            }

            return this.unexpectedAssert('[not] to have properties', args);
        },
        ownProperty: function () {
            this.unexpectedAssert('[not] to have own property', arguments);
            // change the subject to the value of the asserted property
            this.subject = this.subject[arguments[0]];
            return this;
        },
        'hasOwnProperty': function () {
            this.unexpectedAssert('[not] to have own property', arguments);
            // change the subject to the value of the asserted property
            this.subject = this.subject[arguments[0]];
            return this;
        },
        keys: function () {
            if (this.negate) {
                return this.unexpectedAssert('not to have keys', arguments);
            } else {
                return this.unexpectedAssert('to only have keys', arguments);
            }
        },
        lengthOf: function () {
            var newSubject = this.subject;
            // change the subject to the value of the asserted property if no not flag
            if (!this.negate) {
                newSubject = this.subject.length;
            }
            this.unexpectedAssert('[not] to have length', arguments);
            this.subject = newSubject;
            return this;
        },
        length: function () {
            var newSubject = this.subject;
            // change the subject to the value of the asserted property if no not flag
            if (!this.negate) {
                newSubject = this.subject.length;
            }
            this.unexpectedAssert('[not] to have length', arguments);
            this.subject = newSubject;
            return this;
        },
        match: function (value) {
            if (value instanceof RegExp) {
                if (typeof this.subject === 'string') {
                    if (typeof arguments[1] === 'string') {
                        try {
                            var assertion = expandFlags('[not] to match', { not: this.negate });
                            expect(this.subject, assertion, value);
                        } catch (e) {
                            expect.fail(arguments[1]);
                        }
                        return this;
                    }
                    return this.unexpectedAssert('[not] to match', arguments);
                } else if (Array.isArray(this.subject)) {
                    return this.unexpectedAssert('to be an array whose items satisfy', [
                        expandFlags('[not] to match', { not: this.negate }),
                        value
                    ]);
                } else if (typeof this.subject === 'object') {
                    var satisfy = {};
                    Object.keys(this.subject).forEach(function (key) {
                        satisfy[key] = value;
                    });
                    return this.unexpectedAssert('[not] to satisfy', [satisfy]);
                }
            } else if (typeof value === 'function') {
                var result;
                try {
                    result = value(this.subject);
                } catch (e) {
                    if (!this.negate) {
                        throw e;
                    } else {
                        return this;
                    }
                }
                
                if (typeof result !== 'undefined') {
                    expect(result, expandFlags('[not] to be ok', { not: this.negate }));
                }
                
                return this;
            }
        }
    },
    propertyAssertions: {
        ok: '[not] to be truthy',
        'true': function () {
            return this.unexpectedAssert('[not] to equal', [true]);
        },
        'false': function () {
            return this.unexpectedAssert('[not] to equal', [false]);
        },
        arguments: function (value) {
            return this.unexpectedAssert('[not] to be an', ['arguments']);
        },
        'empty': '[not] to be empty',
        'NaN': '[not] to be NaN',
        'Infinity': '[not] to be infinite',
        'Object': '[not] to be an object',
        'Number': '[not] to be a number',
        'Array': '[not] to be an array',
        'Boolean': '[not] to be a boolean',
        'Function': '[not] to be a function',
        'String': '[not] to be a string',
        'Error': function () {
            return this.unexpectedAssert('[not] to be an', [Error]);
        }
    }
};
