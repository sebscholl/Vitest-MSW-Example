import { rest } from 'msw'
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
    500: (await import('./randomuser/_api')).status500,
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
   * Merge the mocked response with the data passed in merged with the default
   * into a new object.
   */
  const response = {
    ...mockedResponses[endpoint][status],
    ...data
  }
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
