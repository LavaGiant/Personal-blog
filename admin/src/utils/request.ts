import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://127.0.0.1:7001/admin/',
  withCredentials:true,
  timeout: 10000,
})

instance.interceptors.request.use(
  config => config,
  error => Promise.reject(error),
)

instance.interceptors.response.use(
  response => response,
  error => Promise.reject(error),
)

export default instance