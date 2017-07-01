import Rx from 'rx'
import DefaultMatcher from './default-matcher'

class Thread {

    constructor(pattern) {
        this.steps = [];
        this.pattern = pattern
        this.subject = new Rx.Subject();
    }

    then(action) {
        this.steps.push(action)
        return this
    }

    matches(context) {
        var matchingFunctor = DefaultMatcher(this.pattern)
        return matchingFunctor(context)
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

export default {
    Thread
}
