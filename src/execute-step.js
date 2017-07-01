import Rx from 'rx'

function executeStep(step, context) {
    var result = step(context)

    if (result instanceof Rx.Observable) {
        return result;
    } else if (result instanceof Function) {
        return this._executeStep(result, context);
    } else {
        return Rx.Observable.just(result);
    }
}

export default {
    executeStep
}