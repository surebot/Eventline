import Rx from 'rx'
import Thread from './thread'
import executeStep from './execute-step'

class Bot {

    constructor() {
        this.afterMiddlewareSubject = new Rx.Subject();
        this.beforeMiddlewareSubject = new Rx.Subject();
        this.middlewares = [];
        this.threads = [];
    }

    emit(context) {
        console.log('Bot Recieved: ' + JSON.stringify(context))
        this.beforeMiddlewareSubject.onNext(context)
    }

    use(component) {
        component(this)
    }

    registerMiddleware(middleware) {
        this.middlewares.push(middleware)
    }

    on(pattern) {
        console.log('Bot Registered Thread: ' + JSON.stringify(pattern))

        var thread = new Thread(pattern)
        this.threads.push(thread)
        return thread
    }

    listen() {
        threads.forEach(this._listenToThread, this)

        this._buildMiddlewareChain("before", beforeMiddlewareSubject)
        .subscribe(this._handleContext)
    }

    _buildMiddlewareChain(type, subject) {

        return middlewares.reduce((currentObservable, middleware) => {

            var observable = currentObservable.flatMap(context => {
                return executeStep(middleware[type], context)
            })

            return observable
                
        }, subject)
    }

    _listenToThread(thread) {
        this._buildMiddlewareChain("after", thread.toObservable())
        .subscribe((context) => {
            this.afterMiddlewareSubject.onNext(context)
        })
    }

    _handleContext(context) {
        var matchingThread = this._threadForContext(context)
        this._validateThread(matchingThread)
            
        context.pattern = matchingThread.pattern
        matchingThread.subject.onNext(context)
    }

    _threadForContext(context) {
        return this.threads.find(thread => {
            return thread.matches(context) 
        })
    }

    _validateThread(thread) {
        if (!thread || thread.steps.length > 0) {
            throw "I wasn't taught to do anything else"
        }
    }
}

export default {
    Bot
}