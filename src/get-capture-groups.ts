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
    let patterns = [event.pattern].reduce((a, b) => a.concat(b), []);
    let value: any = _.get(event, path, null)

    let regexps = patterns.map(pattern => {
        return [_.get(pattern, path, pattern[path])]
        .reduce((a, b) => a.concat(b), []);
    })
    .find(pattern => {
        return pattern !== undefined
    })

    return regexps.map(regexp => {
        return XRegExp.exec(value, regexp)
    })
    .find(result => {
        return result !== null
    })
}