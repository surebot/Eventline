/**
 * Eventline
 * Copyright James Campbell 2017
 */

function isIterable(obj) {

    // checks for null and undefined
    if (obj == null) {
        return false;
    }

    return typeof obj[Symbol.iterator] === 'function';
}

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
export function executeAction(action: any, event: any) {

    if (result instanceof Promise) {

        result = result.then(action => {
            return executeAction(action, event)
        })

    } else if (isIterable(action)) {

        var result: any = event

        for (var step of action) {
            result = executeAction(step, result)
        }

    } else if (action instanceof Function) {
        
        var result = action(event)
        result = executeAction(result, event)

    } else {
        var result = action
    }

    if (!result) {
        return Promise.resolve(event)
    } else {
        return Promise.resolve(result)
    }
}