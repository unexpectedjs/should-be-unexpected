var expect = require('unexpected');

module.exports = {
    doesNotThrow: function (block, error, message) {
        return expect(block, 'not to throw');
    },
    throws: function (block, error, message) {
        return expect(block, 'to throw');
    },
    ok: function (bool) {
        return expect(bool, 'to be ok');
    }
};
