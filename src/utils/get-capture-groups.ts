import * as _ from 'lodash'
import XRegExp from 'xregexp'

export function getCaptureGroups(event: any, path: string) {
    const patternContainer = [event.pattern]
    const patterns = patternContainer.reduce((a, b) => a.concat(b), []);

    const regexp = patterns.map(pattern => {
        return _.get(pattern, path, pattern[path])
    })
    .find(pattern => {
        return pattern !== undefined
    })

    const value = _.get(event, path, null)
    return XRegExp.exec(value, regexp)
}