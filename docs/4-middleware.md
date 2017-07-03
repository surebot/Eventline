# Middleware

Middleware is a way of making sure certain actions are always performed
before or after any of the actions for a paticular route.

This can be useful for always sending read recipts for message or loading and
saving contextual infomation into a database.

```
import Middleware from 'microbot'

class ContextMiddleware extends Middleware {

    constructor() {
        this.context = {}
    }

    before(event) {

        // Load Context
        event.context = this.context

        return event
    }

    after(event) {

        // Save Context
        this.context = event.context

        return event
    }
}

router.registerMiddleware(new ContextMiddleware())
```

The above context middleware will load the context before executing the actions for a route and will save it after excuting all of the actions for a route.

The before and after methods behave exactly like actions so if you know how to write
actions you know how to write middleware.

Middleware like routes will be executed in the order they are registered.
