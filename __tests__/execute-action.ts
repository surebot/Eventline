import { executeAction } from '../src/execute-action'

test('When action returns Value Promise execute it ', () => {

    let value = 1

    let promise = new Promise((resolve, reject) => {
        resolve(1)
    })

    let executor = executeAction(promise,  null)

    return executor.then(result => {
        expect(result).toEqual(value)
    })
});

test('When action returns Array Promise execute it ', () => {

    let value = 1

    let promise = new Promise((resolve, reject) => {
        resolve([1, 1])
    })

    let executor = executeAction(promise,  null)

    return executor.then(result => {
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

    return executor.then(result => {
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

    return executor.then(result => {
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

    return executor.then(result => {
        expect(result).toEqual(value)
    })
});


test('When action returns generator function execute it', () => {
    
    let functorB = function*(action) {
        yield 5
        return 10
    }
    
    let functor = action => {
        return functorB
    }

    let executor = executeAction(event => {
        return functor
    }, null)

    return executor.then(result => {
        expect(result).toEqual(10)
    })
});

test('When action returns value generator execute it', () => {

    let functorB = function*(action) {
        yield 2
        return 10
    }

    let executor = executeAction(functorB, null)

    return executor.then(result => {
        expect(result).toEqual(10)
    })
});

test('When action returns array generator execute it', () => {

    let functorB = function*(action) {
        yield [5]
        return [20]
    }

    let executor = executeAction(functorB, null)

    return executor.then(result => {
        expect(result).toEqual(20)
    })
});

test('When action returns function generator execute it', () => {

    let functorB = function*(action) {
        yield () => {
            console.log('Executed Me Brah')
            return 5
        }
    }

    let executor = executeAction(functorB, null)

    return executor.then(result => {
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
    
    return executor.then(result => {
        expect(events).toEqual([5,5,5,5])
    })
});

test('When action returns void generator return event', () => {

    var event = {}

    let functorB = function*(action) {
    }

    let executor = executeAction(functorB, event)

    return executor.then(result => {
        expect(result).toEqual(event);
    })
});

test('When action returns empty array return event', () => {

    let event = {}

    var executor = executeAction(event => {
        return []
    }, event)

    return executor.then(result => {
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

    return executor.then(result => {
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

    return executor.then(result => {
        expect(events).toEqual([1, 2]);
    })
});

test('When action returns value return value', () => {
    let value = 1
    let executor = executeAction(event => {
        return value
    }, null)

    return executor.then(result => {
        expect(result).toEqual(value);
    })
});

test('When action returns void return event', () => {
    let event = {}
    let executor = executeAction(event => {}, event)

    return executor.then(result => {
        expect(result).toEqual(event);
    })
});

test('When action returns undefined return event', () => {
    let event = {}
    let executor = executeAction(event => {
        return undefined
    }, event)

    return executor.then(result => {
        expect(result).toEqual(event);
    })
});

test('When action returns null return event', () => {
    let event = {}
    let executor = executeAction(event => {
        return null
    }, event)

    return executor.then(result => {
        expect(result).toEqual(event);
    })
});