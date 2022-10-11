import axios from "axios"

function httpRequest(method, url, request) {
  return axios[method](url, request)
    .then((/** @type {any} */ response) => Promise.resolve(response))
    .catch((/** @type {any} */ error) => Promise.reject(error))
}

const axiosRequest = {
  get(url, request) {
    return httpRequest("get", url, request)
  },

  delete(url, request) {
    return httpRequest("delete", url, request)
  },

  post(url, request) {
    return httpRequest("post", url, request)
  },

  put(url, request) {
    return httpRequest("put", url, request)
  },

  patch(url, request) {
    return httpRequest("patch", url, request)
  },
}

export { axiosRequest }
