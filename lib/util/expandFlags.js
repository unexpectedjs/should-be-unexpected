module.exports = function expandFlags(pattern, flags) {
    return pattern.replace(/\[(!?)([^\]]+)\] ?/g, function (match, negate, flag) {
        return Boolean(flags[flag]) !== Boolean(negate) ? flag + ' ' : '';
    }).trim();
};
