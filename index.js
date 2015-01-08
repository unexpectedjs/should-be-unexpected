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
		'to',
		'an',
		'a',
		'have',
		'which',
		'is',
		'and',
		{
			name: 'not',
			method: function () {
				that.negate = !that.negate;
				return that;
			}
		}
	]);
}

ShouldFacade.prototype.unexpectedAssert = function (assertion, args) {
	args = Array.prototype.slice.call(args);
	assertion = expandFlags(assertion, { 'not': this.negate });
	unexpected.apply(unexpected, [this.subject, assertion].concat(args));
	this.negate = false;
	return this;
};

ShouldFacade.prototype.be = function (value) {
	return this.unexpectedAssert('[not] to be', arguments);
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
