# Vue 3 + Vite + MSW

## Steps to Re-create

```sh
$ npm create vite@latest
=> Vue
=> Javascript

$ npm i -D @vue/test-utils @vitejs/plugin-vue happy-dom deepmerge msw
$ npm run dev
```

However, just clone the repo if you rather use the examples:

```sh
$ git clone ________________
```

### Relevant Directories

- src/utils/api
- src/stores/users
- src/views/UsersList
- src/views/UsersListItem


## Installing Vitest

```sh
$ npm install -D vitest
```

Add the `test` script to your `package.json` file.

```json
{
  "scripts": {
    "test": "vitest"
  }
}
```

Add a `vitest.config.js` file to the root directory.

```js
import path from 'path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

export default defineConfig({
    plugins: [vue()],
    base: './',
    test: {
        globals: true,
        environment: 'happy-dom',
        setupFiles: './test/setup.js',
        include: ['./test/**/*.spec.js']
    },
    resolve: {
        alias: [
            {
                find: '@src',
                replacement: path.resolve(__dirname, 'src')
            },
            {
                find: '@test',
                replacement: path.resolve(__dirname, 'test')
            }
        ]
    }
})
```

This config is simply some path resolvers and a setup file. Thes setup file gets run initially, allowing you to configure your test suite.

## Setting up Tests

Create the `test` directory and add the `setup.js` file.

```js
import { beforeAll, afterAll, afterEach } from 'vitest'

console.log('Setting up test files...')
/**
 * Reset msw mock handlers after each test.
 */
import { server } from '@test/mocks'
/**
 * Set NODE_ENV to test so that appropriate envrionment variables load..
 */
process.env['NODE_ENV'] = 'test';

afterAll(() => server.close())
afterEach(() => server.resetHandlers())
beforeAll(() => server.listen({ 
    /* Prevents annoying log statements */
    onUnhandledRequest: 'bypass' 
}))
```

Here, we use Vitests test callbacks to reset our mock server after each test, ensuring that no handler is mocked unintentionally from an already run test or config.

## Mock Setup

Add the follow `test/mocks/index.js` file and add the code:

```js
import { rest } from 'msw'
import deepmerge from 'deepmerge'
import { setupServer } from 'msw/node'
/**
 * Aliases: tags for endpoints, allowing to easily signal to the 
 * handler which endpoint to mock.
 */
const aliases = {
  '@randomuser': import.meta.env.VITE_RANDOM_USER_BASE_URL,
}
/**
 * Mocked Responses: the default mocked responses for each endpoint
 * and specified status code.
 */
const mockedResponses = {
  '@randomuser/api': {
    200: (await import('./randomuser/_api')).status200,
    400: (await import('./randomuser/_api')).status403,
  }
}
/**
 * Extract the alias leading to the first slash.
 * 
 * E.g. @services/configs -> @services
 */
const setUrl = (endpoint) => {
  const splitIdx = endpoint.indexOf('/')
  const baseUrl = aliases[endpoint.substring(0, splitIdx)]

  if (!baseUrl) {
    throw new Error(`No alias found for endpoint: ${endpoint}!`)
  }

  return `${baseUrl}${endpoint.substring(splitIdx)}`
}
/**
 * Setup a new server instance.
 */
export const server = setupServer()
/**
 * Mock: register a mocked response for a given endpoint and status code.
 * This is the main function to be used in the tests.
 */
export const mock = (method, endpoint, status, data = {}) => {
  const url = setUrl(endpoint)
  /**
   * Merge the mocked response with the data passed in merged with the default.
   */
  const response = deepmerge(
    mockedResponses[endpoint][status],
    data
  )
  /**
   * The handler is the mock response. It detects at the network level if the
   * given url gets called and returns the mocked response if found.
   */
  const handler = rest[method](url, (_, res, ctx) => res(
    ctx.status(status),
    ctx.json(response)
  ))
  /**
   * Register the handler with the server. 
   */
  server.use(handler)
}
```

Refer to incode comments.

