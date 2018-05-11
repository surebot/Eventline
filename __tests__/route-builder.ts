import { Route } from '../src/route'
import { RouteBuilder } from '../src/route-builder'

test('should create an action for each route', () => {
  let action = jest.fn()
  let routeA = { then: jest.fn() }
  let routeB = { then: jest.fn() }
  let builder = new RouteBuilder([routeA, routeB]);

  builder.then(action)

  expect(routeA.then).toBeCalledWith(action)
  expect(routeB.then).toBeCalledWith(action)
});