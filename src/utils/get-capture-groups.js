var _ = require('lodash');
var XRegExp = require('xregexp');

function getCaptureGroups(context, path) {
    const patternContainer = [context.pattern]
    const patterns = patternContainer.reduce((a, b) => a.concat(b), []);

    const regexp = patterns.map(pattern => {
        return _.get(pattern, path, pattern[path])
    })
    .find(pattern => {
        return pattern !== undefined
    })

    const value = _.get(context, path, null)
    return XRegExp.exec(value, regexp)
}

module.exports = getCaptureGroups