import * as axios from 'axios'
import envs from '../envs'

let instance = null
let options = {}
options.withCredentials = true
instance = axios.create(options)

instance.interceptors.request.use((config) => {
  if (process.env.RUN_ENV != 'prod') {
    for (let apiName in envs) {
      if (config.url.indexOf(envs[apiName].hostname) >= 0) {
        config.proxy = {
          host : envs[apiName].ip,
          port : envs[apiName].port
        }
      }
    }
  }
  return config
},(error) => {
  Promise.reject(error)
})

export default instance
