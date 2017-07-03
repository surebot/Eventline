import * as Rx from 'rxjs/Rx'
import { Middleware } from './middleware'
import { Route } from './route'
import { executeStep } from './execute-step'

export class Router {

    private beforeMiddlewareSubject: Rx.Subject<object> = new Rx.Subject<any>()
    private afterMiddlewareSubject: Rx.Subject<object> = new Rx.Subject<any>()
    private middlewares: Array<Middleware> = []
    private routes: Array<Route> = []

    route(event: object) {
        console.log('Router Recieved: ' + JSON.stringify(event))
        this.beforeMiddlewareSubject.next(event)
    }

    use(component: (Router) => void) {
        component(this)
    }

    registerMiddleware(middleware: Middleware) {
        this.middlewares.push(middleware)
    }

    on(pattern: any) {
        console.log('Router Registered Route: ' + JSON.stringify(pattern))

        var route = new Route(pattern)
        this.routes.push(route)
        return route
    }

    start() {
        this.routes.forEach(this._listenToRoute, this)

        this._buildMiddlewareChain("before", this.beforeMiddlewareSubject)
        .subscribe(this._handleEvent)
    }

    _buildMiddlewareChain(type: string, subject: Rx.Subject<any>): Rx.Observable<any> {

        return this.middlewares.reduce((currentObservable: Rx.Subject<any>, middleware: Middleware) => {

            var observable = currentObservable.flatMap(event => {
                return executeStep(middleware[type], event)
            })

            return observable
                
        }, subject)
    }

    _listenToRoute(route: Route) {
        this._buildMiddlewareChain("after", route.toObservable())
        .subscribe((event) => {
            this.afterMiddlewareSubject.next(event)
        })
    }

    _handleEvent(event: any) {
        var matchingRoute = this._routeForEvent(event)
            
        if (matchingRoute) {
            event.pattern = matchingRoute.pattern
            matchingRoute.subject.next(event)
        } else {
            console.log("No matching route found")
        }
    }

    _routeForEvent(event: any) {
        return this.routes.find(route => {
            return route.matches(event) 
        })
    }
}