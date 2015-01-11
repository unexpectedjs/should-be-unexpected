var expandFlags = require('./util/expandFlags');
var unexpected = require('unexpected');

function ShouldFacade(subject) {
    this.subject = subject;
    this.negate = false;
}

// Defines not
ShouldFacade.prototype = {
    get not() {
        this.negate = !this.negate;
        return this;
    }
};

// Helper method to work with unexpected
ShouldFacade.prototype.unexpectedAssert = function (assertion, args) {
    args = args ? Array.prototype.slice.call(args) : [];
    assertion = expandFlags(assertion, { 'not': this.negate });
    unexpected.apply(unexpected, [this.subject, assertion].concat(args));
    this.negate = false; // reset negation when an assertion has been
    return this;
};

// Defines noop-words that should just return this
[
    'be',
    'an',
    'of',
    'a',
    'and',
    'have',
    'with',
    'is',
    'which',
    'the'
].forEach(function (prop) {
    Object.defineProperty(ShouldFacade.prototype, prop, { get: function () { return this; } });
});


// Setting up unexpected mappings
var assertions = require('./assertions');

Object.keys(assertions.methodAssertions).forEach(function (assertion) {
    ShouldFacade.prototype[assertion] = function () {
        var value = assertions.methodAssertions[assertion];
        if (typeof value === 'function') {
            return value.apply(this, Array.prototype.slice.call(arguments));
        } else {
            return this.unexpectedAssert(value, arguments);
        }
    };
});

Object.keys(assertions.propertyAssertions).forEach(function (assertion) {
    Object.defineProperty(ShouldFacade.prototype, assertion, {
        get: function () {
            var value = assertions.propertyAssertions[assertion];
            if (typeof value === 'function') {
                return value.apply(this, Array.prototype.slice.call(arguments));
            } else {
                return this.unexpectedAssert(value, arguments);
            }
        }
    });
});

module.exports = ShouldFacade;
