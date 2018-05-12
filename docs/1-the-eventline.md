# The Eventline

To start using Eventline, you first have to import the framework
and create an eventline.

```
import Eventline from 'eventline'

let eventline = new Eventline()
```

In order for the eventline to route events it need to be provided with them. We do this via the `route` method. This is the method that will be called by your event source to pass an event to the eventline.

```
import Eventline from 'eventline'

var eventline = new Eventline()

eventline.route({
    type: 'message'
})
```

For example if we were to setup a webhook for Facebook Messenger using Express.js,
we would call the `route` method with the payload anytime our webhook was provided
with a payload from Facebook.

When integrating this into another framework such as Botkit or Botpress. This is the
method you use to pass on events to be handled by your eventline.

# Error Handling

By default eventline will catch any exceptions triggered and log them to the console, 
this prevents any exceptions crashing the entire server and interupting other sessions.

You can provide your own handler if you wish to perform extra functionality
i.e remote repoting or sending a message to a user from a bot. 

```
eventline.exceptionHandler = (exception, event) => {
    remoteLog.record(exception)
    messenger.send(event.sender.id, {
        text: "Opps, I encountered an error. Our ninja monkeys are looking into is"
    })
}
```

In the example above we record the exception into a remote log and send
a default message via a messenger bot to the user who triggered it.