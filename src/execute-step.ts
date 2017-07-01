import * as Rx from 'rxjs/Rx'

export function executeStep(step: (any) => any, event: any) {
    let result = step(event)

    if (result instanceof Rx.Observable) {
        return result;
    } else if (result instanceof Function) {
        return this._executeStep(result, event);
    } else {
        return Rx.Observable.of(result)
    }
}