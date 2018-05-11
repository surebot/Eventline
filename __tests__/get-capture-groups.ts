import { getCaptureGroups } from '../src/get-capture-groups'
import * as XRegExp from 'xregexp'

test('Returns anonymous capture groups for regular expression from event keypath', () => {

  let regexp = /hello(\d+)/
  let event = {
    'pattern': {
      'text': regexp  
    },
    'text': 'hello1'
  }
  let result = getCaptureGroups(event, 'text')

  expect(result[1]).toEqual('1');
});

test('Returns named capture groups for regular expression from event keypath', () => {
  let regexp = new XRegExp('hello(?<number>\\d+)')
  let event = {
    'pattern': {
      'text': regexp  
    },
    'text': 'hello1'
  }
  let result = getCaptureGroups(event, 'text')

  expect(result.number).toEqual('1');
});

test('Returns anonymous capture groups for regular expression in array from event keypath', () => {

  let regexp = [/hello(\d+)/, /bye(\d+)/]
  let event = {
    'pattern': {
      'text': regexp  
    },
    'text': 'bye1'
  }
  let result = getCaptureGroups(event, 'text')

  expect(result[1]).toEqual('1');
});