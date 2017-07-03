/**
 * Microbot
 * Copyright James Campbell 2017
 */

import * as Rx from 'rxjs/Rx'
import { executeAction } from './execute-action'
import { matcher } from './matcher'

/**
 * 
 * 
 * @export
 * @class Route
 */
export class Route {

    /**
     * 
     * 
     * @type {*}
     * @memberof Route
     */
    public pattern: any

    /**
     * 
     * 
     * @type {Rx.Subject<any>}
     * @memberof Route
     */
    public subject: Rx.Subject<any> = new Rx.Subject<any>()

    /**
     * 
     * 
     * @private
     * @type {Array<any>}
     * @memberof Route
     */
    private actions: Array<any> = []

    /**
     * Creates an instance of Route.
     * @param {*} pattern 
     * @memberof Route
     */
    constructor(pattern: any) {
        this.pattern = pattern
    }

    /**
     * 
     * 
     * @param {(any) => any} action 
     * @returns 
     * @memberof Route
     */
    then(action: (any) => any) {
        this.actions.push(action)
        return this
    }

    /**
     * 
     * 
     * @param {any} event 
     * @returns 
     * @memberof Route
     */
    matches(event) {
        var matchingFunctor = matcher(this.pattern)
        return matchingFunctor(event)
    }

    /**
     * 
     * 
     * @returns 
     * @memberof Route
     */
    toObservable() {
        console.log('Building execution model for ' + JSON.stringify(this.pattern) + '...')

        return this.actions.reduce((observer, action) => {
            return observer.flatMap(context => {
                return executeAction(action, context)
            })
        }, this.subject)
    }
}