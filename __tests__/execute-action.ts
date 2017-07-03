import * as Rx from 'rxjs/Rx'
import { executeAction } from '../src/execute-action'

test('When action returns Observable return Observable', () => {
    let observable = Rx.Observable.of(1)
    let result = executeAction(event => {
        return observable
    })

    expect(result).toBe(observable);
});

test('When action returns Promise return Observable created from Promise', () => {
    let promise = new Promise((resolve, reject) => {})
    let expectedResult = Rx.Observable.fromPromise(promise)
    let result = executeAction(event => {
        return promise
    })

    expect(result).toEqual(expectedResult);
});

test('When action returns function execute it', () => {
    let observable = Rx.Observable.of(1)
    let functor = action => {
        return observable
    }
    let result = executeAction(event => {
        return functor
    })

    expect(result).toBe(observable);
});

test('When action returns value return Observable created from value', () => {
    let value = 1
    let observable = Rx.Observable.of(value)
    let result = executeAction(event => {
        return value
    })

    expect(result).toEqual(observable);
});