/**
 * Microbot
 * Copyright James Campbell 2017
 */

/**
 * This class implements middleware which is a simple way
 * of building actions to be performed before and after all
 * actions across all routes in a router.
 * 
 * @export
 * @class Middleware
 */
export class Middleware {

    /**
     * This method is called with the event recieved by the
     * route before excuting all of it's actions.
     * 
     * @param {*} event 
     * @returns 
     * @memberof Middleware
     */
    before(event: any) {
        return event
    }

    /**
     * This method is called with the event recieved by the
     * route after excuting all of it's actions.
     * 
     * @param {*} event 
     * @returns 
     * @memberof Middleware
     */
    after(event: any) {
        return event
    }
}