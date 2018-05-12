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
  
  return eventline.route(Object.assign({}, pattern))
  .then(event => {
    expect(threadTriggered).toBe(true);
  })
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

  return eventline.route(Object.assign({}, pattern))
  .then(event => {
    expect(actionResults).toEqual([
      middleware.beforeMiddlewareValue,
      2,
      middleware.afterMiddlewareValue]);
  })
});

test('should handle middleware with missing functions', () => {
  let eventline = new Eventline();
  eventline.registerMiddleware({})

  eventline.on({})
  eventline.route({})
});

test('should execute middleware after one with missing functions', () => {
  let beforeMiddlewareTriggered = false;
  let afterMiddlewareTriggered = false;
  let eventline = new Eventline();
 
  eventline.registerMiddleware({})
  eventline.registerMiddleware({
    before: context => {
      beforeMiddlewareTriggered = true
    }
  })
  eventline.registerMiddleware({
    after: context => {
      afterMiddlewareTriggered = true
    }
  })

  eventline.on({})
  
  return eventline.route({})
  .then(event => {
    expect(beforeMiddlewareTriggered).toEqual(true)
    expect(afterMiddlewareTriggered).toEqual(true)
  })
});

test('should execute the first matching route only', () => {
  let actionResults = [];
  let eventline = new Eventline();
  let pattern = {};

  eventline.on(pattern)
  .then(event => {
    actionResults.push(1)
    return event
  })

  eventline.on(pattern)
  .then(event => {
    actionResults.push(2)
    return event
  })

  return eventline.route(Object.assign({}, pattern))
  .then(event => {
    expect(actionResults).toEqual([1]);
  })
});

test('should capture any exception', () => {
  let eventline = new Eventline();
  let pattern = {};

  eventline.on(pattern)
  .then(event => {
    throw "An Error"
  })

  return eventline.route(Object.assign({}, pattern))
});

test('should call exception handler on any exception', () => {
  let eventline = new Eventline();
  let pattern = {};
  let exception = "An Error"

  eventline.exceptionHandler = jest.fn();

  eventline.on(pattern)
  .then(event => {
    throw exception
  })
  
  return eventline.route(Object.assign({}, pattern))
  .then(event => {
    expect(eventline.exceptionHandler).toBeCalledWith(exception, {
      pattern: pattern
    })
  })
});

test('handle no matching routes as an error', () => {
  let eventline = new Eventline();
  let event = {};

  eventline.exceptionHandler = jest.fn();

  eventline.route(event)
  .then(_ => {
    expect(eventline.exceptionHandler).toBeCalledWith("No matching route found", event)
  })
});

test('continue handling events after an error', () => {
  let actionResults = [];
  let eventline = new Eventline();
  let pattern = {};

  eventline.on(pattern)
  .then(event => {
    actionResults.push(1)
    throw "An Error"
  })

  return eventline.route(Object.assign({}, pattern))
  .then(event => {
    return eventline.route(Object.assign({}, pattern))
  })
  .then(event => {
    expect(actionResults).toEqual([1, 1]);
  })
});

test('handlle future events once after an error', () => {
  let actionResults = [];
  let eventline = new Eventline();
  let pattern = { 'pattern': 'A' };
  let patternB = { 'pattern': 'B' };

  eventline.on(pattern)
  .then(event => {
    actionResults.push(1)
    throw "An Error"
  })

  eventline.on(patternB)
  .then(event => {
    actionResults.push(2)
    return event
  })

  return eventline.route(Object.assign({}, pattern))
  .then(event => {
    return eventline.route(Object.assign({}, patternB))
  })
  .then(event => {
    expect(actionResults).toEqual([1, 2]);
  })
});

test('should execute the first matching route only after an error', () => {
  let actionResults = [];
  let eventline = new Eventline();
  let pattern = {};

  eventline.on(pattern)
  .then(event => {
    actionResults.push(1)
    throw "An Error"
  })

  eventline.on(pattern)
  .then(event => {
    actionResults.push(2)
  })

  return eventline.route(Object.assign({}, pattern))
  .then(event => {
    return eventline.route(Object.assign({}, pattern))
  })
  .then(event => {
    expect(actionResults).toEqual([1, 1]);
  })
});

test('stop excuting actions after an error', () => {
  let actionResults = [];
  let eventline = new Eventline();
  let pattern = {};

  eventline.on(pattern)
  .then(event => {
    actionResults.push(1)
    throw "An Error"
  })
  .then(event => {
    actionResults.push(2)
    return event
  })

  return eventline.route(Object.assign({}, pattern))
  .then(event => {
    expect(actionResults).toEqual([1]);
  })
});

test('should execute route if at least one pattern matches', () => {
  let actionResults = [];
  let eventline = new Eventline();
  let patternA = {
    value: 1
  };

  let patternB = {
    value: 2
  };

  eventline.on(patternA, patternB)
  .then(event => {
    actionResults.push(1)
    return event
  })

  return eventline.route(Object.assign({}, patternA))
  .then(event => {
    return eventline.route(Object.assign({}, patternB))
  })
  .then(event => {
    expect(actionResults).toEqual([1, 1]);
  })
});
