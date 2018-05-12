# Actions

By now you will be wondering what these actions are we refer to are. They
are small tasks performed when a route is triggered.

They are always triggered sequentially and in-order. Each action will be
called until either there are no-more actions to be done or one of the
actions triggers an error.

```
eventline.on({
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
a eventline receives.

## Asyncronous Actions

Eventually your bot will need to do something in the background such as
access a database or make an api call. You can simply do this by either returning
a promise, imlementing your action as a generator or as a async/await function.

When using generators please ensure they complete or eventline will deadlock waiting
for it.

## Grouped Actions

Eventline also allows actions to return an array of actions for eventline to execute
in the same order.

```
function Countdown(event) {
    return [
        SayOne,
        SayTwo,
        SayThree
    ]
}
```

For generators you can yield other actions to be executed instead of returning this
array.

```
function* Countdown(event) {
    yield SayOne
    yield SayTwo
    yield SayThree
}
```

## Built In Actions

Eventline has one built in action called `when` it allows you to
only allow an individual action to be triggered when a certain
condition is met.

```
eventline.on({
    text: /.+/
})
.(when(IsFirstMessage, SendWelcomeMessage))
```

In the example above when the `IsFirstMessage` pattern matches
then the `SendWelcomeMessage` action will be triggered.