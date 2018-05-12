// To Run This Example: Just run `npm example`
//

// First Step
// ==========
// You need to import the library
// this is where the magic happens
//
const Eventline = require('../build/main/index');

// Second Step
// ===========
// Create a Eventline for routing your events
// and getting it to do stuff
//
let eventline = new Eventline.Eventline()

// Third Step
// ==========
// Declare a route for your bot to do something
// this one below will log the event when it hears
// an event with the text "hi"
//
eventline.on({
    text: 'Hi'
})

// This action handles the logging
// we pass the event along to be handled by the
// next action
//
.then(event => {
    console.log(event)
    return event
})
.then(event => {
    console.log("=======")
    return event
})

// Fourth Step
// ==========
// Pass our eventline some events to handle, this would be in our webhook normally.
// Here we pass in what the user types
//

const repl = require('repl');

// Type {
//    text: 'Hi'
// } into the REPL to trigger the event above 
function handleEvent(cmd, context, filename, callback) {
  var event = JSON.parse(cmd)
  eventline.route(event)
}

repl.start({ prompt: '> ', eval: handleEvent });