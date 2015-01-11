module.exports = {
    methodAssertions: {
        eql: '[not] to satisfy',
        equal: '[not] to equal',
        property: function () {
            this.unexpectedAssert('[not] to have property', arguments);
            // change the subject to the value of the asserted property
            this.subject = this.subject[arguments[0]];
            return this;
        },
        lengthOf: '[not] to have length',
        exist: function (value) {
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
        'Number': '[not] to be a number'
    }
};
