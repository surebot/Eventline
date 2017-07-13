# Components

Components are ways of grouping together functionality a router can consume.
For example you may have a series of threads and middleware that work together to implement
the Tutorial functionality for your router.

Componenrts allow you to collect this together so it all logically stays in the same place
and allows you to easily add or remove it. Remember good code is easy to delete.

A component is just a function that accepts the router.

```
function TutorialComponent(router) {
    router.on({
        "text": "help"
    }).
    on(DoSomething)
}

router.use(TutorialComponent)
```

We pass this component to the router using the `use` function, this will
execute the component and causes it to create the route contained inside of it
which implements the tutorial functionality.

As before all middleware and threads created by a component are executed in the order they
are declared. 

So this:

``` 
function TutorialComponent(router) {
    router.on({
        "text": "help"
    }).
    on(DoSomething)
}

router.on({
    "text": "hey"
})
.on(SayHello)

router.use(TutorialComponent)
```

Is the same as:

``` 
router.on({
    "text": "hey"
})
.on(SayHello)

router.on({
    "text": "help"
}).
on(DoSomething)
```

We also recommend components as a great way of packaing functionality when creating libraries for Eventline.