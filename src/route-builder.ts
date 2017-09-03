/**
 * Eventline
 * Copyright James Campbell 2017
 */

import { Route } from './route'

/**
 * This class handles building the actions for each
 * route.
 * 
 * @export
 * @class RouteBuilder
 */
export class RouteBuilder {

    /**
     * The routes being built by this builder
     * 
     * @type {*}
     * @memberof RouteBuilder
     */
    private routes: Route[] = []

    /**
     * Creates an instance of RouteBuilder.
     * 
     * @param {*} routes 
     * @memberof RouteBuilder
     */
    constructor(routes: Route[]) {
        this.routes = routes
    }

    /**
     * Registers an actions to be performed
     * by the routes
     * 
     * @param {(any) => any} action 
     * @returns 
     * @memberof RouteBuilder
     */
    then(action: (any) => any) {

        this.routes.forEach(route => {
            route.then(action)
        });

        return this
    }
}