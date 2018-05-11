/**
 * Eventline
 * Copyright James Campbell 2017
 */

function catchException(exceptionHandler: (exception: any, event: any) => void, event: any,  exception: any) {
    if (exceptionHandler) {
        exceptionHandler(exception, event)
    }

    return event
}

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
export function executeAction(action: any, event: any, exceptionHandler: (exception: any, event: any) => void) {
    try {

        if (result instanceof Promise) {

            result = result.then(result => {
                return executeAction(result, event, exceptionHandler)
            })

        } else if (isIterable(action)) {

            var result: any = null
            var currentEvent = event

            for (var step of action) {
                result = executeAction(step, currentEvent, exceptionHandler)
                currentEvent = result
            }

        } else if (action instanceof Function) {
            
            var result = action(event)
            result = executeAction(result, event, exceptionHandler)

        } else {
            var result = action
        }

    } catch (exception) {
        console.error(exception)
        return Promise.resolve(catchException(exceptionHandler, event, exception))
    }

    if (!result) {
        return Promise.resolve(event)
    } else {
        return Promise.resolve(result)
    }
}