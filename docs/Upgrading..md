# Upgrading from v0.1 to v0.2

The biggest changes in this release were a few renames of methods and objects.
Please consult the changelog for details.

# Upgrading from v0.2 to v0.3

Since v0.3 we've dropped native support for Rx.js, if you want to use your
existing Rx.js actions you should convert them to ES6 generators or ES7
async functions.

You now no longer need to call `start` to start eventline and this function has
been removed.