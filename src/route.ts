/**
 * Microbot
 * Copyright James Campbell 2017
 */

import * as Rx from 'rxjs/Rx'
import { executeAction } from './execute-action'
import { matcher } from './matcher'

/**
 * This class represents a route for which
 * an event can be routed to.
 * 
 * A route defines a step of actions to perform as well as
 * what kind of events those actions should be performed for.
 * 
 * @export
 * @class Route
 */
export class Route {

    /**
     * The pattern used to filter out the events
     * used to trigger this route.
     * 
     * @type {*}
     * @memberof Route
     */
    public pattern: any

    /**
     * This subject is used internally to trigger
     * the execution of the actions when a relevante
     * event is recieved.
     * 
     * @type {Rx.Subject<any>}
     * @memberof Route
     */
    private subject: Rx.Subject<any> = new Rx.Subject<any>()

    /**
     * Tbe internal array of actions to perform for this
     * route.
     * 
     * @private
     * @type {Array<any>}
     * @memberof Route
     */
    private actions: Array<any> = []

    /**
     * Creates an instance of Route.
     * 
     * @param {*} pattern 
     * @memberof Route
     */
    constructor(pattern: any) {
        this.pattern = pattern
    }

    /**
     * Registers an action to be performed for this route.
     * 
     * This method returns an instance of the route so that
     * more actions can be declared via chaining.
     * 
     * Each action will be performed in the order that it is
     * declared.
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
     * This method determines if the pattern for
     * the route matches a given event using the
     * built-in matchers.
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
     * This method triggers the actions for this route
     * to be executed by passing them the event one by one.
     * 
     * @param {any} event 
     * @memberof Route
     */
    handle(event) {
        this.subject.next(event)
    }

    /**
     * This internal method builds the excution flow for the runtime
     * and returns and observable for the router
     * to consume and connect up to it's execution flow.
     * 
     * You should not call this for your project.
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