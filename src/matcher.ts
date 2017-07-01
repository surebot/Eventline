import * as _ from 'lodash'
import { XRegExp } from 'xregexp'

function ArrayMatcher(array) {
  const matchingFunctors = array.map((pattern) => {
    return matcher(pattern)
  });

  return (context) => {
    const results = matchingFunctors.map(matchingFunctor => {
      return matchingFunctor(context)
    });

    const matches = results.filter(result => {
      var notMatch = (result === false)
      return !notMatch
    })

    return (matches.length === array.length)
  };
}

function EqualityMatcher(value) {
  return context => {
    return context === value
  }
}

function ObjectMatcher(pattern) {

  return (context) => {
  
    const pairs = _.toPairs(pattern)

    const results = pairs.map(([key, pattern]) => {
      const matcherFunctor = matcher(pattern)
      const eventValue = _.get(context, key, null)
      return [key, matcherFunctor(eventValue)]
    });

    const matches = results.filter(([key, result]) => {
      var notMatch = (result === false)
      return !notMatch
    })

    return (matches.length === pairs.length)
  }
}

function RegExpMatcher(regexp) {
  return context => {
    var is_valid_value = context !== undefined && context !== null
    return is_valid_value && regexp.test(context);
  }
}

export function matcher(pattern) {

    if (pattern instanceof Array) {
      return ArrayMatcher(pattern);
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