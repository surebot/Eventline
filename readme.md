# Eventline
Eventline is a micro-framework for routing and handling events for bots and applications.

It helps to easily build systems that respond to a stream of events in a consistent manner and are easy to test, as well as understand.

Eventline focuses on the Router in the ERA (Event Source, Router, Action) architecture pattern, whilst providing a convention over configuration design to make it easier to integrate other systems.

You can use Eventline either on its own with custom event sources or other frameworks such as Botpress or Botkit.

## Installation
To install simply run:

`npm install eventline --save`

To see an example, clone this repo and run:
`npm run example`

## Examples

```js
on(event)
.then(this)
.then(that)
```
## API Reference

| Functions     | Description   |
| ------------- | ------------- |
| start()       | Content Cell  |
| route()       | Content Cell  |
| on()          | Content Cell  |


## Features

**Convention over configuration**
We've optimised Eventline for developer productivity
by implementing a declarative API which makes it easy to
understand what your application is doing.

**Easily Extendable**
We have a very flexible middleware and component system to
easily extend your application with new functionality and consume
libraries.

**Modern but well supported**
Eventline is written in Typescript to ensure
the code is stable and robust whilst still supporting ECMAScript 5.

**Async Support**
Eventline is built on top of ES6 Generators making asynchronous
behaviour a first class citizen without having to drop down into
promise or callback hell.

**Lightweight**
Eventline is the Router in the ERA (Event Source, Router, Action) Architecture.
It's a lightweight complement to your own custom code or frameworks such as a Botpress or Botkit
rather than yet another bot framework.

**Stateless**
Everything is built to promote a stateless architecture, each action and middleware built
around functional programming; taking an event and returning it to be given to the next step.

This makes it easier to reason about what's happening within your application.

## Used By
- Eventline echo-bot: [Try here](https://facebook.com/Eventline-123597441623033/). [Github repo](https://github.com/surebot/eventline-messenger-bot)
- Sure Messenger chatbot: Bot that curates the most Instagrammed food & drink spots. https://surebot.io

## Developer Experience

I wrote Eventline as a lightweight way of getting a basic way of easily build a chatbot for Sure. I already built and contributed to frameworks like Bottr and Botpress that take a
all-or-nothing approach to adoption.

It's easy to build a predictable and easy to understand chatbot with this framework without having to re-write your entire app.

## Influences

Eventline draws parallels from React, Express.js and Redux with it's component and declarative based architecture.

It combines features from Bottr, Botpress and BroidKit to provide a flexible, yet easy to use router system.

## Motivation

Chatbots are inherently a very asynchronous, state and event based applications.
As mentioned in the Redux documentation, our code has to manage more of this than ever before.

To get an idea of some of the motivation behind Eventline, you should read the
Redux documentation http://redux.js.org/docs/introduction/Motivation.html

We tried to bring some of this thinking to the chatbot world, making it easier to route
events to a series of actions in a declarative fashion.

## Contributing

We are grateful to the community for contributing bug fixes and improvements.

## Acknowledgments
- [James Campbell](https://github.com/jcampbell05)
