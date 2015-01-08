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

	]);
}

ShouldFacade.prototype.be = function (value) {
	var assertion = expandFlags('[not] to be', { 'not': this.negate });
	unexpected(this.subject, assertion, value)
	return this;
};

function should(subject) {
	return new ShouldFacade(subject);
}

Object.defineProperty(Object.prototype, 'should', {
	get: function () {
		return new ShouldFacade(this);
	}
})

module.exports = should;
