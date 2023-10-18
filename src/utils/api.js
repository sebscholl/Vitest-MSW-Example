/**
 * api.js
 * 
 * This file contains the api configuration 
 * and methods to make requests.
 */
const baseUrl = import.meta.env.VITE_RANDOM_USER_BASE_URL

export const get = async function (path, params) {
    const url = `${baseUrl}/${path}?${new URLSearchParams(params)}`
    const response = await fetch(url);
    const data = await response.json();

    return data;
}
/**
 * post | put | patch | delete ...
 */
