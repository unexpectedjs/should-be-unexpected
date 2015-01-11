var ShouldFacade = require('./lib/ShouldFacade');
var extend = require('./lib/util/extendObject');

function should(subject) {
    return new ShouldFacade(subject);
}

extend(should, ShouldFacade.prototype);

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
