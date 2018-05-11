import { when } from '../src/when'

test('when pattern matches for when action then the action should be returned', () => {
  let pattern = {
      'text': 'hi'
  };
  let action = event => {};
  let matcher = when(pattern, action);
  let result = matcher(pattern);

  expect(result).toBe(action);
});

test('when pattern does not match for when action then the event should be returned', () => {
  let pattern = {
      'text': 'hi'
  };
  let event = {};
  let action = event => {};
  let matcher = when(pattern, action);
  let result = matcher(event);

  expect(result).toBe(event);
});
