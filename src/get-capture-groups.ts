/**
 * Microbot
 * Copyright James Campbell 2017
 */

import * as _ from 'lodash'
import * as XRegExp from 'xregexp'

/**
 * This utility function takes an event recieved by a route
 * as well as a keypath for an keypath matched by a regular expression
 * in the pattern and returns the capture groups from the regular expression.
 *
 * 
 * @export
 * @param {*} event 
 * @param {string} path 
 * @returns 
 */
export function getCaptureGroups(event: any, path: string) {
    let patternContainer = [event.pattern]
    let patterns = patternContainer.reduce((a, b) => a.concat(b), []);

    let regexp = patterns.map(pattern => {
        return _.get(pattern, path, pattern[path])
    })
    .find(pattern => {
        return pattern !== undefined
    })

    let value: any = _.get(event, path, null)
    return XRegExp.exec(value, regexp)
}