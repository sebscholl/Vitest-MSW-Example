import { beforeAll, afterAll, afterEach } from 'vitest'
/**
 * Reset msw mock handlers after each test.
 */
import { server } from '@test/mocks'
/**
 * Set NODE_ENV to test so that appropriate envrionment variables load..
 */
process.env['NODE_ENV'] = 'test';
/**
 * Set up global helpers.
 */
import { mock } from '@test/mocks'
import { mountAndFlush } from '@test/support/renderSupport'

function beforeAllCallback() {
    console.log('Setting up test files...')

    global.mock = mock
    global.mountAndFlush = mountAndFlush

    server.listen({ onUnhandledRequest: 'bypass' })
}

function afterAllCallback() {
    console.log('Tearing down test files...')

    delete global.mock
    delete global.mountAndFlush

    server.close()
}

function afterEachCallback() {
    server.resetHandlers()
}

beforeAll(beforeAllCallback)
afterAll(afterAllCallback)
afterEach(afterEachCallback)

