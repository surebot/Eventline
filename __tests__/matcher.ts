import { matcher } from '../src/matcher'
import * as XRegExp from 'xregexp'

test('If object matches then result should be true', () => {
  let pattern = {
    'text': 'hello'
  }
  let event = {
    'text': 'hello'
  }
  let functor = matcher(pattern)
  let result = functor(event)

  expect(result).toBe(true);
});

test('If object matches some of object then result should be true', () => {
  let pattern = {
    'text': 'hello'
  }
  let event = {
    'text': 'hello',
    'name': 'james'
  }
  let functor = matcher(pattern)
  let result = functor(event)

  expect(result).toBe(true);
});

test('If object matches but in different case then result should be true', () => {
  let pattern = {
    'text': 'HeLlO'
  }
  let event = {
    'text': 'hello'
  }
  let functor = matcher(pattern)
  let result = functor(event)

  expect(result).toBe(true);
});

test('If object does not match then result should be false', () => {
  let pattern = {
    'text': 'goodbye'
  }
  let event = {
    'text': 'hello'
  }
  let functor = matcher(pattern)
  let result = functor(event)

  expect(result).toBe(false);
});

test('If deep-object matches then result should be true', () => {
  let pattern = {
    'sender': {
      'id': 1
    }
  }
  let event = {
    'sender': {
      'id': 1
    }
  }
  let functor = matcher(pattern)
  let result = functor(event)

  expect(result).toBe(true);
});

test('If deep-object does not match then result should be false', () => {
  let pattern = {
    'sender': {
      'id': 2
    }
  }
  let event = {
    'sender': {
      'id': 1
    }
  }
  let functor = matcher(pattern)
  let result = functor(event)

  expect(result).toBe(false);
});

test('If deep-object matches via keypath then result should be true', () => {
  let pattern = {
    'sender.id': 1
  }
  let event = {
    'sender': {
      'id': 1
    }
  }
  let functor = matcher(pattern)
  let result = functor(event)

  expect(result).toBe(true);
});

test('If deep-object does not match via keypath then result should be false', () => {
  let pattern = {
    'sender.id': 2
  }
  let event = {
    'sender': {
      'id': 1
    }
  }
  let functor = matcher(pattern)
  let result = functor(event)

  expect(result).toBe(false);
});

test('If object matches regexp then result should be true', () => {
  let pattern = {
    'text': /hello/
  }
  let event = {
    'text': 'hello'
  }
  let functor = matcher(pattern)
  let result = functor(event)

  expect(result).toBe(true);
});

test('If object does not match regexp then result should be false', () => {
  let pattern = {
    'text': /goodbye/
  }
  let event = {
    'text': 'hello'
  }
  let functor = matcher(pattern)
  let result = functor(event)

  expect(result).toBe(false);
});

test('If object matches xregexp then result should be true', () => {
  let pattern = {
    'text': new XRegExp('hello')
  }
  let event = {
    'text': 'hello'
  }
  let functor = matcher(pattern)
  let result = functor(event)

  expect(result).toBe(true);
});

test('If object does not match xregexp then result should be false', () => {
  let pattern = {
    'text': new XRegExp('goodbye')
  }
  let event = {
    'text': 'hello'
  }
  let functor = matcher(pattern)
  let result = functor(event)

  expect(result).toBe(false);
});

test('If object matches function then result should be true', () => {
  let pattern = {
    'text': (value) => {
      return true
    }
  }
  let event = {
    'text': 'hello'
  }
  let functor = matcher(pattern)
  let result = functor(event)

  expect(result).toBe(true);
});

test('If object does not match function then result should be false', () => {
  let pattern = {
    'text': (value) => {
      return false
    }
  }
  let event = {
    'text': 'hello'
  }
  let functor = matcher(pattern)
  let result = functor(event)

  expect(result).toBe(false);
});

test('If object keypath matches at least one value in array then result should be true', () => {
  let pattern = {
    'text': ['hello', 'bye']
  }
  let event = {
    'text': 'hello'
  }
  let functor = matcher(pattern)
  let result = functor(event)
  expect(result).toBe(true);

  event = {
    'text': 'bye'
  }
  result = functor(event)
  expect(result).toBe(true);
});

test('object keypath should flatten values in array pattern then result should be true', () => {
  let pattern = {
    'text': [['hello', 'bye'], 'hotdogs']
  }
  let event = {
    'text': 'hello'
  }
  let functor = matcher(pattern)
  let result = functor(event)
  expect(result).toBe(true);

  event = {
    'text': 'bye'
  }
  result = functor(event)
  expect(result).toBe(true);

  event = {
    'text': 'hotdogs'
  }
  result = functor(event)
  expect(result).toBe(true);
});

test('If array matches object then result should be true', () => {
  let pattern = [{
    'text': 'hello'
  }]
  let event = {
    'text': 'hello'
  }
  let functor = matcher(pattern)
  let result = functor(event)

  expect(result).toBe(true);
});

test('If array does not match object then result should be false', () => {
  let pattern = [{
    'text': 'goodbye'
  }]
  let event = {
    'text': 'hello'
  }
  let functor = matcher(pattern)
  let result = functor(event)

  expect(result).toBe(false);
});

test('If array matches function then result should be true', () => {
  let pattern = [(event) => {
    return true
  }]
  let event = {
    'text': 'hello'
  }
  let functor = matcher(pattern)
  let result = functor(event)

  expect(result).toBe(true);
});

test('If array does not match function then result should be false', () => {
  let pattern = [(event) => {
    return false
  }]
  let event = {
    'text': 'hello'
  }
  let functor = matcher(pattern)
  let result = functor(event)

  expect(result).toBe(false);
});

test('If array matches all elements then result should be true', () => {
  let pattern = [
  (event) => {
    return true
  },  
  (event) => {
    return true
  }]
  let event = {
    'text': 'hello'
  }
  let functor = matcher(pattern)
  let result = functor(event)

  expect(result).toBe(true);
});

test('If array does not match all elements then result should be false', () => {
  let pattern = [
  (event) => {
    return true
  },  
  (event) => {
    return false
  }]
  let event = {
    'text': 'hello'
  }
  let functor = matcher(pattern)
  let result = functor(event)

  expect(result).toBe(false);
});

test('array should flatten first sub-array of patterns', () => {
  let functionPattern = (event) => {
    return true
  }
  let pattern = [[functionPattern, functionPattern], functionPattern]
  let event = {
    'text': 'hello'
  }
  let functor = matcher(pattern)
  let result = functor(event)

  expect(result).toBe(true);
});

test('If function returns false then result should be false', () => {
  let pattern = (event) => {
    return false
  }
  let event = {}
  let functor = matcher(pattern)
  let result = functor(event)

  expect(result).toBe(false);
});