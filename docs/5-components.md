# Components

Components are ways of grouping together functionality a bot (name TBC) can consume.
For example you may have a series of threads and middleware that work together to implement
the Tutorial functionality for your bot (name TBC).

Componenrts allow you to collect this together so it all logically stays in the same place
and allows you to easily add or remove it. Remember good code is easy to delete.

A component is just a function that accepts the bot (name TBC).

```
function TutorialComponent(bot) {
    bot.on({
        "text": "help"
    }).
    on(DoSomething)
}

bot.use(TutorialComponent)
```

We pass this component to the bot (name TBC) using the `use` function, this will
execute the component and causes it to create the thread contained inside of it
which implements the tutorial functionality.

As before all middleware and threads created by a component are executed in the order they
are declared. 

So this:

``` 
function TutorialComponent(bot) {
    bot.on({
        "text": "help"
    }).
    on(DoSomething)
}

bot.on({
    "text": "hey"
})
.on(SayHello)

bot.use(TutorialComponent)
```

Is the same as:

``` 
bot.on({
    "text": "hey"
})
.on(SayHello)

bot.on({
    "text": "help"
}).
on(DoSomething)
```

We also recommend components as a great way of packaing functionality when creating libraries
for Microbot (name TBC).