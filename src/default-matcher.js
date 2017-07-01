var _ = require('lodash');
var XRegExp = require('xregexp');

function DefaultMatcher(pattern) {

    if (pattern instanceof Array) {
      return new ArrayMatcher(pattern);
    } else if (pattern instanceof RegExp) {
      return new RegExpMatcher(pattern);
    } else if (pattern instanceof Function) {
      return pattern
    } else if (pattern instanceof Object) {
      return new ObjectMatcher(pattern);
    } else {
      return new EqualityMatcher(pattern);
    }
}

function ArrayMatcher(array) {
  const matchingFunctors = array.map((pattern) => {
    return new DefaultMatcher(pattern)
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
      const matcherFunctor = new DefaultMatcher(pattern)
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

module.exports = DefaultMatcher