module.exports = {
    methodAssertions: {
        eql: '[not] to equal',
        property: function () {
            this.unexpectedAssert('[not] to have property', arguments);
            // change the subject to the value of the asserted property
            this.subject = this.subject[arguments[0]];
            return this;
        },
        lengthOf: '[not] to have length'
    },
    propertyAssertions: {
        ok: '[not] to be ok',
        Number: '[not] to be a number'
    }
};
