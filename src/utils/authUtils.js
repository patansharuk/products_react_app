/**
 * Constant representing the key for storing user details in the local storage
 * @type {string}
 */
export const USER_DETAILS_KEY = "user_details"

/**
 * Constant representing the key for storing jwt token in the local storage
 * @type {string}
 */
export const JWT_TOKEN_KEY = "jwt_token"


/**
 * Remove the JWT Token from the local storage
 * 
 * @example 
 * clear_auth_token()
 */
export const clear_auth_token = () => {
    localStorage.removeItem(JWT_TOKEN_KEY)
}

/**
 * Remove the user details from the local storage
 */
export const clear_user_details = () => {
    localStorage.removeItem(USER_DETAILS_KEY)
}

/**
 * Add the JWT Token to the local storage
 * @param {string} token - The JWT Token to be stored
 */
export const add_auth_token = (token) => {
    localStorage.setItem(JWT_TOKEN_KEY, JSON.stringify(token))
}

/**
 * Add the user details to the local storage
 * @param {object} user 
 */
export const add_user_details = (user) => {
    localStorage.setItem(USER_DETAILS_KEY, JSON.stringify(user))
}

/**
 * @returns {string|null} - The stored JWT Token or null if not found
 */
export const get_auth_token = () => {
    return JSON.parse(localStorage.getItem(JWT_TOKEN_KEY))
}

/**
 * @returns {object|null} - The stored user details or null if not found
 */
export const get_user_details = () => {
    return JSON.parse(localStorage.getItem(USER_DETAILS_KEY))
}

/**
 * Clear the auth token and user details and redirect to the given path
 */
export const clear_local_storage_replace_to = (path) => {
    clear_auth_token()
    clear_user_details()
    window.location.replace(path)
}