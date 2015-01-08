var unexpected = require('unexpected');

function expandFlags(pattern, flags) {
    return pattern.replace(/\[(!?)([^\]]+)\] ?/g, function (match, negate, flag) {
        return Boolean(flags[flag]) !== Boolean(negate) ? flag + ' ' : '';
    }).trim();
}

function defineProps(object, props) {
	props.forEach(function (prop) {
		if (typeof prop === 'object') {
			Object.defineProperty(object, prop.name, { get: prop.method });
		} else {
			Object.defineProperty(object, prop, {
				get: function () {
					return object;
				}
			});
		}
	});
}

function ShouldFacade(subject) {
	var that = this;

	this.subject = subject;
	this.negate = false;

	defineProps(this, [
		'be', // return this
		'an',
		'of',
		'a',
		'and',
		'have',
		'with',
		'is',
		'which',
		'the',
		{
			name: 'not',
			method: function () {
				that.negate = !that.negate;
				return that;
			}
		},
		{
			name: 'ok',
			method: function () {
				return that.unexpectedAssert('[not] to be ok');
			}
		}

	]);
}

ShouldFacade.prototype.unexpectedAssert = function (assertion, args) {
	args = args ? Array.prototype.slice.call(args) : [];
	assertion = expandFlags(assertion, { 'not': this.negate });
	unexpected.apply(unexpected, [this.subject, assertion].concat(args));
	this.negate = false; // reset negation when an assertion has been 
	return this;
};

ShouldFacade.prototype.eql = function (value) {
	return this.unexpectedAssert('[not] to equal', arguments);
};

ShouldFacade.prototype.property = function () {
	return this.unexpectedAssert('[not] to have property', arguments);
};

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
