/**
 * Eventline
 * Copyright James Campbell 2017
 */

export * from './middleware'
export * from './eventline'
export * from './get-capture-groups'
export * from './when'

/*
Warn the consumer that Eventline only supports the new RxJS if we detect the old one
is installed.

Hopefully this will save on headaches.
*/
try {
    console.log(require.resolve("rx"));
    console.error("Eventline detected an old version of RxJS is installed. Eventline only supports version 5 and above. Please ensure you use the correct version in your code if you are having problems with Eventline.");
} catch(_) {}