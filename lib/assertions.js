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
            // Convert arguments to array, as unexpecteds type system treats
            // arguments-arrays differently.
            var args = Array.prototype.slice.call(arguments);
            // the args are applied in this.unexpectedAssert, and we need an
            // empty list to be passed as the first argument if no keys are
            // given
            if (args.length === 0) { args = [[]]; }
            console.log(args);
            if (this.negate) {
                return this.unexpectedAssert('not to have keys', args);
            } else {
                return this.unexpectedAssert('to only have keys', args);
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
