
/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */

export const publicRoutes = [
    '/auth/new-verification',
    '/api',
]

/**
 * An array of routes that are use for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
*/

export const authRoutes = [
    '/auth/sign-up',
    '/auth/sign-in',
    '/auth/error',
    '/auth/new-password',
    '/auth/reset',
]

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth'


/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/settings'

