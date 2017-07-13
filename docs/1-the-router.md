# The Router

To start using Eventline, you first have to import the framework
and create a router.

```
import Router from 'eventline'

let router = new Router()
```

The next step is to tell the router to start. Right now
this won't do anything as we haven't declared any routing logic.

```
import Router from 'eventline'

var router = new Router()
router.start()
```

In order for the router to route events it need to be provided with them. We do this via the `route` method. This is the method that will be called by your event source to pass an event to the router.

```
import Router from 'eventline'

var router = new Router()

router.start()

router.route({
    type: 'message'
})
```

For example if we were to setup a webhook for Facebook Messenger using Express.js,
we would call the `route` method with the payload anytime our webhook was provided
with a payload from Facebook.

When integrating this into another framework such as Botkit or Botpress. This is the
method you use to pass on events to be handled by your router.
