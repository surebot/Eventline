/**
 * Microbot
 * Copyright James Campbell 2017
 */

import * as Rx from 'rxjs/Rx'
import { Middleware } from './middleware'
import { Route } from './route'
import { executeStep } from './execute-step'

/**
 * 
 * 
 * @export
 * @class Router
 */
export class Router {

    /**
     * 
     * 
     * @private
     * @type {Rx.Subject<object>}
     * @memberof Router
     */
    private beforeMiddlewareSubject: Rx.Subject<object> = new Rx.Subject<any>()

    /**
     * 
     * 
     * @private
     * @type {Rx.Subject<object>}
     * @memberof Router
     */
    private afterMiddlewareSubject: Rx.Subject<object> = new Rx.Subject<any>()

    /**
     * 
     * 
     * @private
     * @type {Array<Middleware>}
     * @memberof Router
     */
    private middlewares: Array<Middleware> = []

    /**
     * 
     * 
     * @private
     * @type {Array<Route>}
     * @memberof Router
     */
    private routes: Array<Route> = []

    /**
     * 
     * 
     * @param {object} event 
     * @memberof Router
     */
    route(event: object) {
        console.log('Router Recieved: ' + JSON.stringify(event))
        this.beforeMiddlewareSubject.next(event)
    }

    /**
     * 
     * 
     * @param {(Router) => void} component 
     * @memberof Router
     */
    use(component: (Router) => void) {
        component(this)
    }

    /**
     * 
     * 
     * @param {Middleware} middleware 
     * @memberof Router
     */
    registerMiddleware(middleware: Middleware) {
        this.middlewares.push(middleware)
    }

    /**
     * 
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
     * 
     * 
     * @memberof Router
     */
    start() {
        this.routes.forEach(this._listenToRoute, this)

        this._buildMiddlewareChain("before", this.beforeMiddlewareSubject)
        .subscribe(this._handleEvent)
    }

    /**
     * 
     * 
     * @param {string} type 
     * @param {Rx.Subject<any>} subject 
     * @returns {Rx.Observable<any>} 
     * @memberof Router
     */
    _buildMiddlewareChain(type: string, subject: Rx.Subject<any>): Rx.Observable<any> {

        return this.middlewares.reduce((currentObservable: Rx.Subject<any>, middleware: Middleware) => {

            var observable = currentObservable.flatMap(event => {
                return executeStep(middleware[type], event)
            })

            return observable
                
        }, subject)
    }

    /**
     * 
     * 
     * @param {Route} route 
     * @memberof Router
     */
    _listenToRoute(route: Route) {
        this._buildMiddlewareChain("after", route.toObservable())
        .subscribe((event) => {
            this.afterMiddlewareSubject.next(event)
        })
    }

    /**
     * 
     * 
     * @param {*} event 
     * @memberof Router
     */
    _handleEvent(event: any) {
        var matchingRoute = this._routeForEvent(event)
            
        if (matchingRoute) {
            event.pattern = matchingRoute.pattern
            matchingRoute.subject.next(event)
        } else {
            console.log("No matching route found")
        }
    }

    /**
     * 
     * 
     * @param {*} event 
     * @returns 
     * @memberof Router
     */
    _routeForEvent(event: any) {
        return this.routes.find(route => {
            return route.matches(event) 
        })
    }
}