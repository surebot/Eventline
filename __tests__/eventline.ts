import { Eventline } from '../src/eventline'
import { Middleware } from '../src/middleware' 

export class FakeMiddleware implements Middleware {

    actionResults: Array<any>
    beforeMiddlewareValue = 1
    afterMiddlewareValue = 3

    constructor(actionResults) {
        this.actionResults = actionResults
    }

    before(event: any) {
        this.actionResults.push(this.beforeMiddlewareValue)
        return event
    }

    after(event: any) {
        this.actionResults.push(this.afterMiddlewareValue)
        return event
    }
}

test('should consume component', () => {
  let componentConsumed = false;
  let eventline = new Eventline();
  let component = eventline => {
    componentConsumed = true
  }

  eventline.use(component)

  expect(componentConsumed).toBe(true);
});

test('should pass eventline to consumed component', () => {
  let passedInEventline = false;
  let eventline = new Eventline();
  let component = eventline => {
    passedInEventline = eventline
  }

  eventline.use(component)

  expect(passedInEventline).toBe(eventline);
});

test('should build routes', () => {
  let threadTriggered = false;
  let eventline = new Eventline();
  let pattern = {};

  eventline.on(pattern)
  .then(event => {
    threadTriggered = true
    return event
  })

  eventline.start()
  eventline.route(pattern)

  expect(threadTriggered).toBe(true);
});

test('should execute middleware', () => {
  let actionResults = [];
  let eventline = new Eventline();
  let pattern = {};
  let middleware = new FakeMiddleware(actionResults)

  eventline.registerMiddleware(middleware)

  eventline.on(pattern)
  .then(event => {
    actionResults.push(2)
    return event
  })

  eventline.start()
  eventline.route(pattern)

  expect(actionResults).toEqual([
    middleware.beforeMiddlewareValue,
    2,
    middleware.afterMiddlewareValue]);
});