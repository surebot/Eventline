import { Router } from '../src/router'
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
  let router = new Router();
  let component = router => {
    componentConsumed = true
  }

  router.use(component)

  expect(componentConsumed).toBe(true);
});

test('should pass router to consumed component', () => {
  let passedInRouter = false;
  let router = new Router();
  let component = router => {
    passedInRouter = router
  }

  router.use(component)

  expect(passedInRouter).toBe(router);
});

test('should build routes', () => {
  let threadTriggered = false;
  let router = new Router();
  let pattern = {};

  router.on(pattern)
  .then(event => {
    threadTriggered = true
    return event
  })

  router.start()
  router.route(pattern)

  expect(threadTriggered).toBe(true);
});

test('should execute middleware', () => {
  let actionResults = [];
  let router = new Router();
  let pattern = {};
  let middleware = new FakeMiddleware(actionResults)

  router.registerMiddleware(middleware)

  router.on(pattern)
  .then(event => {
    actionResults.push(2)
    return event
  })

  router.start()
  router.route(pattern)

  expect(actionResults).toEqual([
    middleware.beforeMiddlewareValue,
    2,
    middleware.afterMiddlewareValue]);
});