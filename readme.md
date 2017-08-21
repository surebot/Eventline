# Eventline
Eventline is a micro-framework for routing and handling events for bots and applications

Eventline is a predictable event routing framework for building chatbots or event based applications.

It helps to easy build systems that respond to a stream of events in a consistent manner and are easy to test as well as understand.

Eventline, focuses on the Router in the ERA (Event Source, Router, Action) architecture pattern. Whilst providing a convention over configuration design to make it easier to integrate other systems.

You can use Eventline either on it's own with custom event sources or other frameworks such as Botpress or Botkit.

## Installation
To Install simply run:

`npm install eventline --save`

To see an example, clone this repo and run:
`npm run example`

## Examples

We have several examples [on the website](https://facebook.github.io/react/). Here is the first one to get you started:

```js
on(event)
.then(this)
.then(that)
```

## Features

**Convention over configuration**
We've optimized Eventline for developer productivity
by implmenting a declarative API which makes it easy to
understand what your application is doing.

**Easily Extendable**
We have a very flexible middleware and component system to
easily extend your application with new functionality and consume
libraries.

**Modern but well supported**
Eventline is written in Typescript to ensure
the code is stable and robust whilst still supporting ECMAScript 5.

**Async Support**
Eventline is buit ontop of RX.js making asyncronous 
behaviour a first class citizen without having to drop down into
promise or callback hell.

**Lightweight**
Eventline is the Router in the ERA (Event Source, Router, Action) Architecture.
It's a lightweight complement to your own custom code or frameworks such as a Botpress or Botkit
rather than yet another bot framework.

**Stateless**
Everything is built to promote a stateless architecture, each action and middleware built
around fuctional programming; taking an event and returning it to be given to the next step.

This makes it easier to reason about whats happening within your application.

# Used By

- Eventline powers Surebot: A chatbot service that curates the most Instagrammed food & drink spots. https://surebot.io

# Developer Experience

I wrote Eventline as a lightweight way of getting a basic way of easily build a chatbot for Surebot. I already built and contributed to frameworks like Bottr and Botpress who take a
all or nothing approach to adoption.

It's easy to built a predictable easy to understand chatbot with this framework without having to re-write your entire app. 

# Influences

Eventline draws parralels from React, Express.js and Redux with it's component and declrative based architecture.

It combines features from Bottr, Botpress and BroidKit to provide a flexible yet easy to use router system.

# Motivation

Chatbots are inherrently a very asyncronous, state and event based application.
As mentioned in the redux documentation our code has to manage more of this than ever before.

To get an idea of some of motivation behind Eventline, you should read the
redux documentation http://redux.js.org/docs/introduction/Motivation.html

We try to being some of this thinking to the chatbot world, making it easier to route
events to a series of actions in a declarative fashion. 

# Contributing

We are grateful to the community for contributing bugfixes and improvements. 
