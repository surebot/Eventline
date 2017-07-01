# The Router (Right now it's called the Bot, but not sure of the best name)

To start using Microbot (name TBC), you first have to import the framework
and create your bot (name TBC).

```
import Bot from 'microbot'

var bot = new Bot()
```

The next step is to tell the bot (name TBC) to start listening to events. Right now
this won't do anything as we haven't declared any routing logic.

```
import Bot from 'microbot'

var bot = new Bot()

bot.listen()
```

Now your bot (name TBC) won't do anything by itself, it needs to be given events to router
and respond to.

We do this via the `emit` method. This is the method that will be
called by your event source to pass an event to the bot (name TBC).

```
import Bot from 'microbot'

var bot = new Bot()

bot.listen()

bot.emit({
    type: 'message'
})
```

For example if we were to setup a webhook for Facebook Messenger using Express.js,
we would call the `emit` method with the payload anytime our webhook was provided
with a payload from Facebook.

When integrating this into another framework such as Botkit or Botpress. This is the
method you use to pass on events to be handled by your bot (name TBC).
