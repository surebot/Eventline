/**
 * Eventline
 * Copyright James Campbell 2017
 */

import * as Rx from 'rxjs/Rx'

var GeneratorFunction = Object.getPrototypeOf(function*(){}).constructor;

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
export function* executeAction(action: any, event: any, exceptionHandler: (exception: any, event: any) => void) {
    try {
        
        if (!(action instanceof GeneratorFunction) && action instanceof Function) {
            var result = action(event)
        } else {
            var result = action
        }

    } catch (exception) {
        console.error(exception)
        return catchException(exceptionHandler, event, exception)
    }

    if (!result) {
        yield event
    // } else if (result instanceof Array) {

    //     var currentEvent = event

    //     for (var action of result) {
    //         currentEvent = yield executeAction(action, currentEvent, exceptionHandler)
    //     }

    //     yield currentEvent

    // } else if (result instanceof Promise) {

    //     try {
    //         result = yield result
    //         return result

    //     } catch(exception) {
    //         var catcher = buildExceptionCatcher(exceptionHandler, event)
    //         return catchException(exceptionHandler, event, exception)
    //     }
        
    // } else if (result instanceof GeneratorFunction) {

    //     var lastResult = result

    //     for (let nextResult of result(event)) { 
    //         lastResult = executeAction(nextResult, event, exceptionHandler) 
    //     }

    //     return lastResult

    } else if (result instanceof Function) {
        yield executeAction(result, event, exceptionHandler);
    } else {
        yield result
    }
}