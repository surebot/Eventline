/**
 * Eventline
 * Copyright James Campbell 2017
 */

import * as Rx from 'rxjs/Rx'

function catchException(exceptionHandler: (exception: any, event: any) => void, event: any,  exception: any) {
    if (exceptionHandler) {
        exceptionHandler(exception, event)
    }

    return Rx.Observable.empty()
}

function buildExceptionCatcher(exceptionHandler: (exception: any, event: any) => void, event: any) {
    return function (exception) {
        return catchException(exceptionHandler, event, exception)
    }
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
        
        if (action instanceof Function) {
            var result = action(event)
        } else {
            var result = action
        }

    } catch (exception) {
        console.error(exception)
        return catchException(exceptionHandler, event, exception)
    }

    if (!result) {
        return Rx.Observable.of(event)
    } else if (result instanceof Array) {

        if (result.length == 0) {
            return Rx.Observable.of(event)
        }

        let firstAction = executeAction(result[0], event, exceptionHandler)

        if (result.length == 1) {

            return firstAction

        } else {

            result.shift()

            return result.reduce((observer, action) => {
                return observer.flatMap(context => {
                    return executeAction(action, event, exceptionHandler)
                })
                
            }, firstAction)
        }

    } else if (result instanceof Rx.Observable) {
        return result.catch(buildExceptionCatcher(exceptionHandler, event))        
    } else if (result instanceof Promise) {
        return Rx.Observable.fromPromise(result).catch(buildExceptionCatcher(exceptionHandler, event)) 
    } else if (result instanceof Function) {
        return executeAction(result, event, exceptionHandler);
    } else {
        return Rx.Observable.of(result)
    }
}