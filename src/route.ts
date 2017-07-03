import * as Rx from 'rxjs/Rx'
import { executeStep } from './execute-step'
import { matcher } from './matcher'

export class Route {

    private steps: Array<any> = []
    public pattern: any
    public subject: Rx.Subject<any> = new Rx.Subject<any>()

    constructor(pattern: any) {
        this.pattern = pattern
    }

    then(action: (any) => any) {
        this.steps.push(action)
        return this
    }

    matches(event) {
        var matchingFunctor = matcher(this.pattern)
        return matchingFunctor(event)
    }

    toObservable() {
        console.log('Building execution model for ' + JSON.stringify(this.pattern) + '...')

        return this.steps.reduce((observer, step) => {
            return observer.flatMap(context => {
                return executeStep(step, context)
            })
        }, this.subject)
    }
}