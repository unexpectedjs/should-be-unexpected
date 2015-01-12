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
        // throw: '[not] to throw',
        // match: '[not] to match',
        // containEql: '[not] to contain',
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
        lengthOf: '[not] to have length',
        length: '[not] to have length',
        exist: function (value) { // 'to be null or undefined'
            if (arguments.length === 1) {
                this.subject = value;
            }
            if (this.negate) {
                return this.unexpectedAssert('to be null', arguments);
            } else {
                return this.unexpectedAssert('not to be null', arguments);
            }
        }
    },
    propertyAssertions: {
        ok: '[not] to be ok',
        'true': function () {
            return this.unexpectedAssert('[not] to equal', [true]);
        },
        'false': function () {
            return this.unexpectedAssert('[not] to equal', [false]);
        },
        arguments: function (value) {
            return this.unexpectedAssert('[not] to be an', ['arguments']);
        },
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
