// import { logger } from './log4js'

/* resolve errors */
function logErrors(err, req, res, next) {
  // let errorLog = logger('errorLog')
  // errorLog.addContext('request_method', req.method)
  // errorLog.addContext('request_url', req.url)
  // errorLog.addContext('request_param', JSON.stringify(req.params))
  // errorLog.addContext('content', err.message)
  // errorLog.error(err)
  res.sendStatus(err.response.status)
}

export default logErrors
