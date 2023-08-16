import axios from 'axios';

const apiClient = axios.create({
  // Can set any default configurations here, such as base URL, headers, etc.
  baseURL: 'http://204.236.168.121:9090/v1/',
})

apiClient.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          console.error('Bad request')
          break
        case 401:
          console.error('Unauthorized')
          break
        case 403:
          console.error('Forbidden')
          break
        case 404:
          console.error('Not found')
          break
        case 500:
          console.error('Internal server error')
          break
        default:
          console.error('Unknown error')
      }
    } else if (error.request) {
      console.error('No response')
    } else {
      console.error('Request error')
    }
    return Promise.reject(error)
  }
)

// Fetcher object with all methods
const fetcher = {
  get: async function (endpoint, params = null) {
    const headers = {};
    const response = await apiClient.get(endpoint, { params, headers })
    return response.data
  },
  post: async function(endpoint, data = null) {
    const headers = {};
    const response = await apiClient.post(endpoint, data, { headers });
    return response.data;
  },
  patch: async function (endpoint, data = null) {
    const response = await apiClient.patch(endpoint, data)
    return response.data
  },
  delete: async function (endpoint) {
    const response = await apiClient.delete(endpoint)
    return response.data
  },
  put: async function (endpoint, data = null) {
    const response = await apiClient.put(endpoint, data)
    return response.data
  },
}
export default fetcher
