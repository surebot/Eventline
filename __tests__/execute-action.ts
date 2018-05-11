import { executeAction } from '../src/execute-action'

// test('When action returns Promise execute it ', () => {

//     let promise = new Promise((resolve, reject) => {
//         resolve(1)
//     })

//     let result = executeAction(event => {
//         return promise
//     }, null, null)

//     expect(result.next()).toEqual(1)
// });

test('When action returns function execute it', () => {
    let value = 1
    let functor = action => {
        return value
    }
    let executor = executeAction(event => {
        return functor
    }, null, null)

    expect(executor.next().value).toEqual(1)
});

// test('When action returns generator execute it', () => {
//     let events = []

//     let functorA = function*(action) {
//         events.push(1)
//     }

//     let functorB = function*(action) {
//         yield functorA
//         yield functorA
//         yield functorA
//         yield functorA
//     }

//     executeAction(functorB, null, null)

//     expect(events).toEqual([1, 1, 1, 1])
// });

// test('When action returns empty array do nothing', () => {
//     executeAction(event => {
//         return []
//     }, null, null)
// });

// test('When action returns array execute in order', () => {
//     let events = [];

//     let functor = (value) => {
//         return (event) => {
//             events.push(value)
//             return event
//         }
//     }

//     let result = executeAction(event => {
//         return [
//             functor(1),
//             functor(2)
//         ]
//     }, 1, null)

//     result
//     .subscribe(function(event) {
//         expect(events).toEqual([1, 2])
//     })
// });


// test('When passed array of actions execute in order', () => {
//     let events = [];

//     let functor = (value) => {
//         return (event) => {
//             events.push(value)
//             return event
//         }
//     }

//     let executor = executeAction([
//         functor(1),
//         functor(2)
//     ], 1, null)

//     let results = Array.from(executor);
//     expect(events).toEqual([1, 2])
// });

test('When action returns value return value', () => {
    let value = 1
    let executor = executeAction(event => {
        return value
    }, null, null)

    expect(executor.next().value).toEqual(value);
});

test('When action returns void return event', () => {
    let event = {}
    let executor = executeAction(event => {}, event, null)

    expect(executor.next().value).toEqual(event);
});

test('When action returns undefined return event', () => {
    let event = {}
    let executor = executeAction(event => {
        return undefined
    }, event, null)

    expect(executor.next().value).toEqual(event);
});

test('When action returns null return event', () => {
    let event = {}
    let executor = executeAction(event => {
        return null
    }, event, null)

    expect(executor.next().value).toEqual(event);
});