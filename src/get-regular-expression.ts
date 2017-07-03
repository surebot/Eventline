/**
 * Microbot
 * Copyright James Campbell 2017
 */

import * as _ from 'lodash'
import { XRegExp } from 'xregexp'

/**
 * This utility function takes an event recieved by a route
 * as well as a keypath for an element matched by a regular expression
 * in the pattern and returns the regular expression itself.
 * 
 * This allows developers to access the capture groups and other properties
 * for the match which may be useful for an application.
 * 
 * @export
 * @param {*} event 
 * @param {string} path 
 * @returns 
 */
export function getRegularExpression(event: any, path: string) {
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