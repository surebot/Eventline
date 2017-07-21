/**
 * Eventline
 * Copyright James Campbell 2017
 */

import * as Rx from 'rxjs/Rx'
import { Middleware } from './middleware'
import { Route } from './route'
import { executeAction } from './execute-action'

/**
 * This class is in charge of coordinating events from an event source
 * and turning them into actions to be executed based on routes.
 * 
 * @export
 * @class Eventline
 */
export class Eventline {
    
    /**
     * Function for handling what happens when an exception occurs.
     * 
     * @memberof Eventline
     */
    public exceptionHandler = (exception: any, event: any) => {
        console.error("An exception occured: " + exception + " For: " + event)
    }

    /**
     * This subject is used internally to initiate the
     * execution of middleware used before a route's actions
     * 
     * @private
     * @type {Rx.Subject<object>}
     * @memberof Router
     */
    private beforeMiddlewareSubject: Rx.Subject<object> = new Rx.Subject<any>()

    /**
     * This subject is used internally to initiate the
     * execution of middleware used after a route's actions
     * 
     * @private
     * @type {Rx.Subject<object>}
     * @memberof Router
     */
    private afterMiddlewareSubject: Rx.Subject<object> = new Rx.Subject<any>()

    /**
     * An internal array used to hold all of the
     * registered middleware for this router
     * 
     * @private
     * @type {Array<Middleware>}
     * @memberof Router
     */
    private middlewares: Array<Middleware> = []

    /**
     * An internal array used to hold all of the
     * registered routes for this router
     * 
     * @private
     * @type {Array<Route>}
     * @memberof Router
     */
    private routes: Array<Route> = []

    /**
     * Passes an event for the router to route
     * 
     * @param {object} event 
     * @memberof Router
     */
    route(event: object) {
        console.log('Router Recieved: ' + JSON.stringify(event))

        try {
            this.beforeMiddlewareSubject.next(event)
        }
        catch(exception)
        {
            if (this.exceptionHandler) {
                this.exceptionHandler(exception, event)
            }    
        }
    }

    /**
     * Passes a component for the router to consume
     * 
     * @param {(Router) => void} component 
     * @memberof Router
     */
    use(component: (Router) => void) {
        component(this)
    }

    /**
     * Registers middleware with
     * the router
     * 
     * @param {Middleware} middleware 
     * @memberof Router
     */
    registerMiddleware(middleware: Middleware) {
        this.middlewares.push(middleware)
    }

    /**
     * Registers a route for the router
     * 
     * @param {*} pattern 
     * @returns 
     * @memberof Router
     */
    on(pattern: any) {
        console.log('Router Registered Route: ' + JSON.stringify(pattern))

        var route = new Route(pattern)
        this.routes.push(route)
        return route
    }

    /**
     * Initiates the router and builds the routes
     * for the runtime
     * 
     * @memberof Router
     */
    start() {
        this.routes.forEach(this.listenToRoute, this)

        this.buildMiddlewareChain("before", this.beforeMiddlewareSubject)
        .subscribe(this.handleEvent.bind(this))
    }

    /**
     * An internal method for bulding a middleware execution
     * flow for the runtime
     * 
     * @param {string} type 
     * @param {Rx.Subject<any>} subject 
     * @returns {Rx.Observable<any>} 
     * @memberof Router
     */
    private buildMiddlewareChain(type: string, subject: Rx.Subject<any>): Rx.Observable<any> {

        return this.middlewares.reduce((currentObservable: Rx.Observable<any>, middleware: Middleware) => {

            var observable = currentObservable.flatMap(event => {
                return executeAction(middleware[type].bind(middleware), event)
            })

            return observable
                
        }, subject)
    }

    /**
     * An internal method for bulding a route execution
     * flow for the runtime
     * 
     * @param {Route} route 
     * @memberof Router
     */
    private listenToRoute(route: Route) {
        this.buildMiddlewareChain("after", route.toObservable())
        .subscribe((event) => {
            this.afterMiddlewareSubject.next(event)
        })
    }

    /**
     * An internal method for taking an event
     * finding a matching router and triggering it.
     * 
     * @param {*} event 
     * @memberof Router
     */
    private handleEvent(event: any) {
        var matchingRoute = this.routeForEvent(event)
            
        if (matchingRoute) {
            event.pattern = matchingRoute.pattern
            matchingRoute.handle(event)
        } else {
            console.log("No matching route found")
        }
    }

    /**
     * An internal method which finds
     * a matching route given an event
     * 
     * Each route is evaluated in the
     * order it was declared.
     * 
     * @param {*} event 
     * @returns 
     * @memberof Router
     */
    private routeForEvent(event: any) {
        return this.routes.find(route => {
            return route.matches(event) 
        })
    }
}