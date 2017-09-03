import jest from 'jest';
import { RouteBuilder } from '../src/route-builder'

test('should create an action for each route', () => {
  let routes = [
      jest.fn(),
      jest.fn()
  ];
  let builder = new RouteBuilder(routes);

  builder.then(event => {})


});