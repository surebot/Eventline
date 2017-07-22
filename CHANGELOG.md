# v0.2.2

- Fixes issues with previous version not being built correctly

# v0.2.1

- Handles events that aren't matched by any route as an error.

# v0.2.0

- Strings in patterns are now case-insensitive (i.e "Hello" will match "hello" and "HELLO")
- `Router` renamed to `Eventline` to prevent confusion with the concept of a router for API frameworks. This framework is between a router and a eventbus so this reflects that.
- We now handle exceptions and log them to the console to prevent server crashes. You can provide your own exception handler by setting your function on the new `exceptionHandler` property for your eventline.
- We now provide an example for eventline
- We now bundle a simple `when` action by default which allows you to optionally switch on and off individual actions for a route based on pattern matching.

# v0.1.0

- Initial Release
