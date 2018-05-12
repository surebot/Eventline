/**
 * Eventline
 * Copyright James Campbell 2017
 */

import { Middleware } from './middleware'
import { Route } from './route'
import { RouteBuilder } from './route-builder'
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
        
        if (exception && exception.stack) {
            console.error(exception.stack)
        }
    }

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

        return this.runMiddleware("before", event)
        .then(event => {
            return this.handleEvent(event)
        })
        .then(event => {
            return this.runMiddleware("after", event)
        })
        .catch(exception => {
            return this.exceptionHandler(exception, event)
        })
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
     * Registers routes for the router
     * 
     * @param {*} patterns
     * @returns RouteBuilder
     * @memberof Router
     */
    on(...patterns: any[]) {

        let newRoutes = patterns.map(pattern => {
            console.log('Router Registered Route: ' + JSON.stringify(pattern))
            return new Route(pattern)
        })
        
        this.routes = this.routes.concat(newRoutes)

        return new RouteBuilder(newRoutes)
    }

    /**
     * An internal method for running middleware
     * flow for the runtime
     * 
     * @param {string} type 
     * @param {any} event 
     * @returns {Promise} 
     * @memberof Router
     */
    private runMiddleware(type: string, event: any): Promise<any>{

        let validMiddleware = this.middlewares.filter(middleware => {
            return middleware[type]
        })

        return validMiddleware.reduce((promise, middleware) => {

            return promise.then(currentEvent => {
                let middlewareFunction = middleware[type]
                return executeAction(middlewareFunction.bind(middleware), event)
            })
                
        }, Promise.resolve(event))
    }

    /**
     * An internal method for taking an event
     * finding a matching router and triggering it.
     * 
     * @param {*} event 
     * @return Promise
     * @memberof Router
     */
    private handleEvent(event: any) {
        var matchingRoute = this.routeForEvent(event)
            
        if (matchingRoute) {
           event.pattern = matchingRoute.pattern
           return matchingRoute.handle(event)
        } else {
            throw "No matching route found"
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