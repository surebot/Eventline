import * as Rx from 'rxjs/Rx'
import { executeAction } from '../src/execute-action'

test('When action returns Observable return Observable', () => {
    let observable = Rx.Observable.of(1)
    let result = executeAction(event => {
        return observable
    }, null, null)

    expect(result instanceof Rx.Observable).toEqual(true);
});

test('When action returns Promise return Observable created from Promise', () => {
    let promise = new Promise((resolve, reject) => {})
    let result = executeAction(event => {
        return promise
    }, null, null)

    expect(result instanceof Rx.Observable).toEqual(true)
});

test('When action returns function execute it', () => {
    let observable = Rx.Observable.of(1)
    let functor = action => {
        return observable
    }
    let result = executeAction(event => {
        return functor
    }, null, null)

    expect(result instanceof Rx.Observable).toEqual(true)
});

test('When action returns empty array do nothing', () => {
    executeAction(event => {
        return []
    }, null, null)
});

test('When action returns array execute in order', () => {
    let events = [];

    let functor = (value) => {
        return (event) => {
            events.push(value)
            return event
        }
    }

    let result = executeAction(event => {
        return [
            functor(1),
            functor(2)
        ]
    }, 1, null)

    result
    .subscribe(function(event) {
        expect(events).toEqual([1, 2])
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

    let result = executeAction([
        functor(1),
        functor(2)
    ], 1, null)

    result
    .subscribe(function(event) {
        expect(events).toEqual([1, 2])
    })
});

test('When action returns value return Observable created from value', () => {
    let value = 1
    let observable = Rx.Observable.of(value)
    let result = executeAction(event => {
        return value
    }, null, null)

    expect(result).toEqual(observable);
});

test('When action returns void return event', () => {
    let event = {}
    let observable = Rx.Observable.of(event)
    let result = executeAction(event => {}, event, null)

    expect(result).toEqual(observable);
});

test('When action returns undefined return event', () => {
    let event = {}
    let observable = Rx.Observable.of(event)
    let result = executeAction(event => {
        return undefined
    }, event, null)

    expect(result).toEqual(observable);
});

test('When action returns null return event', () => {
    let event = {}
    let observable = Rx.Observable.of(event)
    let result = executeAction(event => {
        return null
    }, event, null)

    expect(result).toEqual(observable);
});