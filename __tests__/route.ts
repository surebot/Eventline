import { Route } from '../src/route'

test('should store pattern', () => {
  let pattern = { text: /.+/ };
  let route = new Route(pattern);

  expect(route.pattern).toBe(pattern);
});

test('if pattern matches then matches should return true', () => {
  let pattern = event => {
    return true
  }
  let route = new Route(pattern);

  expect(route.matches({})).toBe(true);
});

test('should execute action', () => {
  let actionCalled = false
  let route = new Route({});

  route.then(event => {
    actionCalled = true
    return event
  })

  route.toObservable()
  .subscribe()
  route.handle({})

  expect(actionCalled).toBe(true);
});

test('should execute actions in order', () => {
  let actionResults = []
  let route = new Route({});

  route
  .then(event => {
    actionResults.push(1)
    return event
  })
  
  route.then(event => {
    actionResults.push(2)
    return event
  })

  route.toObservable()
  .subscribe()
  route.handle({})

  expect(actionResults).toEqual([1,2]);
});