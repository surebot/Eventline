# Actions

By now you will be wondering what these actions are we refer to are. They
are small tasks performed when a thread is triggered.

They are always triggered sequentially and in-order. Each action will be
called until either there are no-more actions to be done or one of the
actions triggers an error.

```
bot.on({
    type: 'message'
})
.then(Step1)
.then(Step2)
.then(Step3)
```

## Syncronous Actions

This is by far the simpilest action, your function will do something and
return the current state of the event to be passed onto the next event.

```
function ReverseText(event) {
    event.text = event.text.reversed()
    return event
}
```

In this action we reverse the text so "hey" becomes "yeh". The next action
will see the modified text. 

This system allows actions to modify, filter or add content to an event
a bot (name TBC) receives.

## Asyncronous Actions

Eventually your bot (name TBC) will need to do something in the background such as
access a database or make an api call. This requires a asyncronous action.

Microbot (name TBC) is built ontop of Rx.js. For those not familiar with this, Rx
allows you to compose async events in a way that allows you to trigger tasks after
another async task completes and pass the results of that action between them.

That way it avoids common issues with callback and promise hell. In an upcoming
version of Javascript this will be a first-class citizen.

```
import Rx from 'rx'

function DoSomethingAsync(event) {
    return Rx.observabe.create((subscriber) => {
        sleep(1000)
        subscriber.onNext(event)
        subscriber.onComplete()
    })
}
```

In the example above, the action waits 1 second before passing the event
onto onto the next action. Since this is built using observables this should
be non-blocking. Allowing your bot (name TBC) to handle other events that may
arrive.

Becuase Microbot (name TBC) gurantees order, the next action will only execute
once this action issues the `onNext` and `onComplete` methods.

If we encountered any kind of error and wanted to stop execution of the next
actions we would simply pass in the error via the `onError` method.

Additionally since async actions have more control over flow of our bot (name TBC)
we can simply return `Rx.observable.empty()` to say that there wasn't an error
but the bot shouldn't do anything either although we don't reccomend it.
