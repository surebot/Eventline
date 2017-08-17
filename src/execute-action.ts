/**
 * Eventline
 * Copyright James Campbell 2017
 */

import * as Rx from 'rxjs/Rx'

/**
 * Internal method used by the middleware and routes for
 * executing the actions.
 * 
 * This implements the logic for handling sync and async actions.
 * 
 * @export
 * @param {(any) => any} action 
 * @param {*} event 
 * @returns 
 */
export function executeAction(action: (any) => any, event: any) {
    let result = action(event)

    if (Rx.Observable.isObservable(result)) {
        return result;
    } else if (result instanceof Promise) {
        return Rx.Observable.fromPromise(result)
    } else if (result instanceof Function) {
        return executeAction(result, event);
    } else {
        return Rx.Observable.of(result)
    }
}