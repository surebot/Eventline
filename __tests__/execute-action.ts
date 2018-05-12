import { executeAction } from '../src/execute-action'

test('When action returns Value Promise execute it ', () => {

    let value = 1

    let promise = new Promise((resolve, reject) => {
        resolve(1)
    })

    let executor = executeAction(promise,  null)

    executor.then(result => {
        expect(result).toEqual(value)
    })
});

test('When action returns Array Promise execute it ', () => {

    let value = 1

    let promise = new Promise((resolve, reject) => {
        resolve([1])
    })

    let executor = executeAction(promise,  null)

    executor.then(result => {
        expect(result).toEqual(value)
    })
});

test('When action returns Function Promise execute it ', () => {

    let value = 1

    let promise = new Promise((resolve, reject) => {
        resolve(() => {
            return value
        })
    })

    let executor = executeAction(promise,  null)

    executor.then(result => {
        expect(result).toEqual(value)
    })
});

test('When action returns value function execute it', () => {
    var value = 1
    
    let functor = action => {
        return value
    }

    let executor = executeAction(event => {
        return functor
    }, null)

    executor.then(result => {
        expect(result).toEqual(value)
    })
});


test('When action returns array function execute it', () => {
    var value = 1
    
    let functor = action => {
        return [value]
    }

    let executor = executeAction(event => {
        return functor
    }, null)

    executor.then(result => {
        expect(result).toEqual(value)
    })
});


test('When action returns generator function execute it', () => {
    
    let functorB = function*(action) {
        yield 5
    }
    
    let functor = action => {
        return functorB
    }

    let executor = executeAction(event => {
        return functor
    }, null)

    executor.then(result => {
        expect(result).toEqual(value)
    })
});

test('When action returns value generator execute it', () => {

    let functorB = function*(action) {
        yield 5
    }

    let executor = executeAction(functorB, null)

    executor.then(result => {
        expect(result).toEqual(5)
    })
});

test('When action returns array generator execute it', () => {

    let functorB = function*(action) {
        yield [5]
    }

    let executor = executeAction(functorB, null)

    executor.then(result => {
        expect(result).toEqual(5)
    })
});

test('When action returns function generator execute it', () => {

    let functorB = function*(action) {
        yield () => {
            return 5
        }
    }

    let executor = executeAction(functorB, null)

    executor.then(result => {
        expect(result).toEqual(5)
    })
});

test('When action returns generator generator execute itr', () => {

    var events = []

    let functorA = function*(action) {
        events.push(5)
        yield events
    }

    let functorB = function*(action) {
        yield functorA
        yield functorA
        yield functorA
        yield functorA
    }

    let executor = executeAction(functorB, null)
    
    executor.then(result => {
        expect(events).toEqual([5,5,5,5])
    })
});

test('When action returns void generator return event', () => {

    var event = {}

    let functorB = function*(action) {
    }

    let executor = executeAction(functorB, event)

    executor.then(result => {
        expect(result).toEqual(event);
    })
});

test('When action returns empty array return event', () => {

    let event = {}

    var executor = executeAction(event => {
        return []
    }, event)

    executor.then(result => {
        expect(result).toEqual(event);
    })
});

test('When action returns array execute in order', () => {
    let events = [];

    let functor = (value) => {
        return (event) => {
            events.push(value)
            return event
        }
    }

    let executor = executeAction(event => {
        return [
            functor(1),
            functor(2)
        ]
    }, null)

    executor.then(result => {
        expect(events).toEqual([1, 2]);
    })
});


test('When passed array of actions execute in order', () => {
    let events = [];

    let functor = (value) => {
        return (event) => {
            events.push(value)
            return event
        }
    }

    let executor = executeAction([
        functor(1),
        functor(2)
    ], null)

    executor.then(result => {
        expect(events).toEqual([1, 2]);
    })
});

test('When action returns value return value', () => {
    let value = 1
    let executor = executeAction(event => {
        return value
    }, null)

    executor.then(result => {
        expect(result).toEqual(value);
    })
});

test('When action returns void return event', () => {
    let event = {}
    let executor = executeAction(event => {}, event)

    executor.then(result => {
        expect(result).toEqual(event);
    })
});

test('When action returns undefined return event', () => {
    let event = {}
    let executor = executeAction(event => {
        return undefined
    }, event)

    executor.then(result => {
        expect(result).toEqual(event);
    })
});

test('When action returns null return event', () => {
    let event = {}
    let executor = executeAction(event => {
        return null
    }, event)

    executor.then(result => {
        expect(result).toEqual(event);
    })
});