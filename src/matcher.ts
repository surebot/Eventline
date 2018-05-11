/**
 * Eventline
 * Copyright James Campbell 2017
 */

import * as _ from 'lodash'
import { XRegExp } from 'xregexp'

/**
 * An internal method for implementing
 * the array matcher functionality.
 * 
 * All conditions in the array must match
 * in order of this matcher to match.
 * 
 * @param {any} array 
 * @param {boolean} topLevel
 * @returns 
 */
function ArrayMatcher(array, topLevel=true) {
  const matchingFunctors = array.map((pattern) => {
    return matcher(pattern, topLevel)
  });

  return (event) => {
    const results = matchingFunctors.map(matchingFunctor => {
      return matchingFunctor(event)
    });

    const matches = results.filter(result => {
      var notMatch = (result === false)
      return !notMatch
    })

    if (topLevel) {
      return (matches.length === array.length)
    } else {
      return (matches.length > 0)
    }
    
  };
}

/**
 * An internal method for implementing
 * the equality matcher functionality.
 * 
 * The value of the pattern and the value in the event
 * should match in order for this matcher to match.
 * 
 * @param {any} value 
 * @returns 
 */
function EqualityMatcher(value) {
  return event => {

    let a = event
    let b = value

    if (typeof a === 'string' && typeof b === 'string') {
      a = a.toLowerCase()
      b = b.toLowerCase()
    }

    return a === b
  }
}

/**
 * An internal method for implementing
 * the object matcher functionality.
 * 
 * All key-value pairs should match in order for this matcher to match.
 * 
 * @param {any} pattern 
 * @returns 
 */
function ObjectMatcher(pattern) {

  return (event) => {
  
    const pairs = _.toPairs(pattern)

    const results = pairs.map(([key, pattern]) => {
      const matcherFunctor = matcher(pattern, false)
      const eventValue = _.get(event, key, null)
      return [key, matcherFunctor(eventValue)]
    });

    const matches = results.filter(([key, result]) => {
      var notMatch = (result === false)
      return !notMatch
    })

    return (matches.length === pairs.length)
  }
}

/**
 * An internal method for implementing
 * the regexr matcher functionality.
 * 
 * The value should match the regular expression in order for this
 * matcher to match.
 * 
 * @param {any} pattern 
 * @returns 
 */
function RegExpMatcher(regexp) {
  return event => {
    var is_valid_value = event !== undefined && event !== null
    return is_valid_value && regexp.test(event);
  }
}

/**
 * An internal method for implementing
 * the matching logic for the routes.
 * 
 * This function will delegate to the relevant
 * matching logic based on the type of pattern.
 * 
 * @param {any} pattern - pattern handle matching
 * @param {boolean} topLevel - determines if we are at the top level of the pattern
 * @returns 
 */
export function matcher(pattern, topLevel=true) {

    if (pattern instanceof Array) {
      return ArrayMatcher(pattern, topLevel);
    } else if (pattern instanceof RegExp) {
      return RegExpMatcher(pattern);
    } else if (pattern instanceof Function) {
      return pattern
    } else if (pattern instanceof Object) {
      return ObjectMatcher(pattern);
    } else {
      return EqualityMatcher(pattern);
    }
}