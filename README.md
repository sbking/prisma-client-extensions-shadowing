# Prisma Client Extension with a computed field that shadows itself

This repo shows an issue with a Prisma Client Extension that adds a `result`
extension for a computed field that shadows a field of the same name.

## Instructions

```sh
npm install
npm run db:up
npm run db:setup
npm run start
npm run db:down
```

If the shadowed field is included in the `needs` list of dependencies, I get
a runtime error:

```
RangeError: Maximum call stack size exceeded
    at Array.flatMap (<anonymous>)
    at /Users/stephen/Projects/prisma-client-extensions-shadowing/node_modules/@prisma/client/runtime/index.js:31121:48
    at Cache.getOrCreate (/Users/stephen/Projects/prisma-client-extensions-shadowing/node_modules/@prisma/client/runtime/index.js:31090:19)
    at resolveNeeds (/Users/stephen/Projects/prisma-client-extensions-shadowing/node_modules/@prisma/client/runtime/index.js:31119:18)
    at Array.flatMap (<anonymous>)
    at /Users/stephen/Projects/prisma-client-extensions-shadowing/node_modules/@prisma/client/runtime/index.js:31121:48
    at Cache.getOrCreate (/Users/stephen/Projects/prisma-client-extensions-shadowing/node_modules/@prisma/client/runtime/index.js:31090:19)
    at resolveNeeds (/Users/stephen/Projects/prisma-client-extensions-shadowing/node_modules/@prisma/client/runtime/index.js:31119:18)
    at Array.flatMap (<anonymous>)
    at /Users/stephen/Projects/prisma-client-extensions-shadowing/node_modules/@prisma/client/runtime/index.js:31121:48 {
  clientVersion: '4.7.1'
}
```
