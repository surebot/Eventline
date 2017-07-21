import { matcher } from './matcher'


/**
 * An action which only triggers a certain
 * action when the pattern matches the
 * event passed to it.
 * 
 * @export
 * @param {any} pattern 
 * @param {any} action 
 * @returns 
 */
export function when(pattern, action) {
    return event => {
        let matchingFunctor = matcher(pattern)

        if (matchingFunctor(event)) {
            return action
        } else {
            return event
        }
    }
}