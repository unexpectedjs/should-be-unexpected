var unexpected = require('unexpected');

function expandFlags(pattern, flags) {
    return pattern.replace(/\[(!?)([^\]]+)\] ?/g, function (match, negate, flag) {
        return Boolean(flags[flag]) !== Boolean(negate) ? flag + ' ' : '';
    }).trim();
}

function extend(obj) {
    var args = Array.prototype.slice.call(arguments, 1);
    args.forEach(function (source) {
        if (source) {
            for (var prop in source) {
                obj[prop] = source[prop];
            }
        }
    });
    return obj;
}

function ShouldFacade(subject) {
	this.subject = subject;
	this.negate = false;
}

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

// Defines not
Object.defineProperty(ShouldFacade.prototype, 'not', {
    get: function () {
        this.negate = !this.negate;
        return this;
    }
});

// Helper method to work with unexpected
ShouldFacade.prototype.unexpectedAssert = function (assertion, args) {
	args = args ? Array.prototype.slice.call(args) : [];
	assertion = expandFlags(assertion, { 'not': this.negate });
	unexpected.apply(unexpected, [this.subject, assertion].concat(args));
	this.negate = false; // reset negation when an assertion has been
	return this;
};

// Setting up unexpected mappings
var assertions = require('./lib/assertions');

Object.keys(assertions.methodAssertions).forEach(function (assertion) {
    ShouldFacade.prototype[assertion] = function () {
        return this.unexpectedAssert(assertions.methodAssertions[assertion], arguments);
    };
});

Object.keys(assertions.propertyAssertions).forEach(function (assertion) {
    Object.defineProperty(ShouldFacade.prototype, assertion, {
        get: function () {
            return this.unexpectedAssert(assertions.propertyAssertions[assertion], arguments);
        }
    });
});


function should(subject) {
	return new ShouldFacade(subject);
}

Object.defineProperty(Object.prototype, 'should', {
	get: function () {
		var value = this;
		if (value instanceof Number || value instanceof String || value instanceof Boolean) {
			value = value.valueOf();
		}
		return new ShouldFacade(value);
	}
});

module.exports = should;
