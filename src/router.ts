import * as Rx from 'rxjs/Rx'
import { Middleware } from './middleware'
import { Thread } from './thread'
import { executeStep } from './execute-step'

export class Router {

    private beforeMiddlewareSubject: Rx.Subject<object> = new Rx.Subject<any>()
    private afterMiddlewareSubject: Rx.Subject<object> = new Rx.Subject<any>()
    private middlewares: Array<any> = []
    private threads: Array<any> = []

    emit(context: object) {
        console.log('Bot Recieved: ' + JSON.stringify(context))
        this.beforeMiddlewareSubject.next(context)
    }

    use(component: (Router) => void) {
        component(this)
    }

    registerMiddleware(middleware: Middleware) {
        this.middlewares.push(middleware)
    }

    on(pattern: any) {
        console.log('Bot Registered Thread: ' + JSON.stringify(pattern))

        var thread = new Thread(pattern)
        this.threads.push(thread)
        return thread
    }

    listen() {
        this.threads.forEach(this._listenToThread, this)

        this._buildMiddlewareChain("before", this.beforeMiddlewareSubject)
        .subscribe(this._handleEvent)
    }

    _buildMiddlewareChain(type: string, subject: Rx.Subject<any>) {

        return this.middlewares.reduce((currentObservable, middleware) => {

            var observable = currentObservable.flatMap(event => {
                return executeStep(middleware[type], event)
            })

            return observable
                
        }, subject)
    }

    _listenToThread(thread: Thread) {
        this._buildMiddlewareChain("after", thread.toObservable())
        .subscribe((event) => {
            this.afterMiddlewareSubject.next(event)
        })
    }

    _handleEvent(event: any) {
        var matchingThread = this._threadForEvent(event)
        this._validateThread(matchingThread)
            
        event.pattern = matchingThread.pattern
        matchingThread.subject.next(event)
    }

    _threadForEvent(event: any) {
        return this.threads.find(thread => {
            return thread.matches(event) 
        })
    }

    _validateThread(thread: Thread) {
        if (!thread || thread.steps.length > 0) {
            throw "I wasn't taught to do anything else"
        }
    }
}