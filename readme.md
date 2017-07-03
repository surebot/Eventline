# Microbot (Name TBC)

Microbot (Name TBC) is a predictable routing framework for building chatbots or event based applications.

It helps to easy build systems that respond to a stream of events in a consistent manner
and are easy to test as well as understand.

Microbot (Name TBC), focuses on the Router in the ERA (Event Source, Router, Action) architecture pattern. Whilst providing a convention over configuration design to make it easier to integrate other systems.

You can use Microbot (Name TBC) either on it's own with custom event sources or other frameworks such as Botpress or Botkit.

# Features

@todo
- Add fetures into docs
- Unit Test
- Pick final name and logo

# Used By

- Microbot powers Surebot a resturant reccomendation system - https://www.messenger.com/t/surebot

# Developer Experience

I wrote Microbot (Name TBC) as a lightweight way of getting a basic way of easily build a chatbot for Surebot. I already built and contributed to frameworks like Bottr and Botpress who take a
all or nothing approach to adoption.

It's easy to built a predictable easy to understand chatbot with this framework without having to re-write your entire app. 

# Influences

Microbot draws parralels from React, Express.js and Redux with it's component and declrative based architecture.

It combines features from Bottr, Botpress and BroidKit to provide a flexible yet easy to use router system.

# Motivation

Chatbots are inherrently a very asyncronous, state and event based application.
As mentioned in the redux documentation our code has to manage more of this than ever before.

To get an idea of some of motivation behind Microbot (Name TBC), you should read the
redux documentation http://redux.js.org/docs/introduction/Motivation.html

We try to being some of this thinking to the chatbot world, making it easier to route
events to a series of actions in a declarative fashion. 
