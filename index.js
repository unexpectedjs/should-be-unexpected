var ShouldFacade = require('./lib/ShouldFacade');
var extend = require('./lib/util/extendObject');
var expect = require('unexpected');

function should(subject) {
    return new ShouldFacade(subject);
}

var uninspected = require('uninspected');
uninspected.outputFormat = 'text';
should.format = uninspected.inspect;

Object.defineProperty(should, 'not', {
    get: function () {
        this.negate = !this.negate;
        return this;
    }
});

should.exist = function (value) { // 'to be null or undefined'
    var not = !!this.negate;
    this.negate = false;
    if (not) {
        return expect.it('to be null').or('to be undefined')(value);
    } else {
        return expect.it('not to be null').and('not to be undefined')(value);
    }
};

extend(should, ShouldFacade.prototype);


should.equal = function (subject, value) {
    return expect(subject, 'to equal', value);
};

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
