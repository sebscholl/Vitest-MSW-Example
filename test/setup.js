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
    // onUnhandledRequest: 'bypass' 
}))
