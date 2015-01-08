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

function defineProps(object, props) {
	props
}

function ShouldFacade(subject) {
	var that = this;

	this.subject = subject;
	this.negate = false;

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
		},
		{
			name: 'Number',
			method: function () {
				return that.unexpectedAssert('[not] to be a number');
			}
		}
	].forEach(function (prop) {
		if (typeof prop === 'object') {
			Object.defineProperty(that, prop.name, { get: prop.method });
		} else {
			Object.defineProperty(that, prop, {
				get: function () {
					return that;
				}
			});
		}
	});
}

extend(ShouldFacade.prototype, {
	unexpectedAssert: function (assertion, args) {
		args = args ? Array.prototype.slice.call(args) : [];
		assertion = expandFlags(assertion, { 'not': this.negate });
		unexpected.apply(unexpected, [this.subject, assertion].concat(args));
		this.negate = false; // reset negation when an assertion has been 
		return this;
	},
	eql: function (value) {
		return this.unexpectedAssert('[not] to equal', arguments);
	},
	property: function () {
		return this.unexpectedAssert('[not] to have property', arguments);
	}
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
