/**
 * Eventline
 * Copyright James Campbell 2017
 */

var GeneratorFunction = (function*(){yield undefined;}).constructor;

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

    var result: any = event

    if (action instanceof GeneratorFunction) {
 
       var generator = action(event);
       var lastIteration: any = null;
       var done = false;
       var value = undefined;

       while(!done) {
         lastIteration = generator.next()
         value = lastIteration.value

         if (value !== undefined) {
            result = executeAction(value, event)
         }

         done = lastIteration.done
       }

    } else if (action instanceof Promise) {

        result = action.then(action => {
            return executeAction(action, event)
        })

    } else if (isIterable(action)) {

        for (var step of action) {
            result = executeAction(step, result)
        }

    } else if (action instanceof Function) {
        
        result = action(event)
        result = executeAction(result, event)

    } else {
        result = action
    }

    if (!result) {
        return Promise.resolve(event)
    } else {
        return Promise.resolve(result)
    }
}