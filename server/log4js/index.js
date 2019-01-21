import log4js from 'log4js'

const defaultPattern = '```%d{yyyy-MM-dd hh.mm.ss,SSS}``` ```%p``` ```%c``` ```%m```'
const infoPattern = '```%d{yyyy-MM-dd hh.mm.ss,SSS}``` ```%X{thread}``` ```%X{project}``` ```%X{module}``` ```%p``` ```%m```'
const errorPattern = '```%d{yyyy-MM-dd hh.mm.ss,SSS}``` ```%X{thread}``` ```%X{project}``` ```%X{module}``` ```%p``` ```%X{request_method}``` ```%X{request_url}``` ```%X{request_param}``` ```%X{content}``` ```%m```'

log4js.configure({
    appenders: {
      console: { type: 'console' },
      connectFile: { type: 'DateFile', filename: 'logs/Connect', pattern: '_yyyyMMdd.log', alwaysIncludePattern: true , layout: { type: 'pattern', pattern: defaultPattern} },
      infoFile: { type: 'DateFile', filename: 'logs/Info',pattern: '_yyyyMMdd.log', alwaysIncludePattern: true , level: 'info', maxLevel:'info', layout: { type: 'pattern', pattern: infoPattern} },
      errorFile: { type: 'DateFile', filename: 'logs/Error',pattern: '_yyyyMMdd.log', alwaysIncludePattern: true , level: 'error', maxLevel:'info', layout: { type: 'pattern', pattern: errorPattern} }
    },
    categories: {
      default: { appenders: ['console'], level: 'trace' },
      connectLog: { appenders: ['connectFile'], level: 'debug' },
      infoLog: { appenders: ['console','infoFile'], level: 'debug' },
      errorLog: { appenders: ['console','errorFile'], level: 'debug' }
    },
    pm2: true
})

let levels = {
    'trace': log4js.levels.TRACE,
    'debug': log4js.levels.DEBUG,
    'info': log4js.levels.INFO,
    'warn': log4js.levels.WARN,
    'error': log4js.levels.ERROR,
    'fatal': log4js.levels.FATAL
}

let logger = function (name, level) {
    let _logger = log4js.getLogger(name)
    _logger.level = levels[level] || levels['debug']
    _logger.addContext('thread','-')
    _logger.addContext('module','-')
    return _logger
};

let use = function (app, level) {
    app.use(log4js.connectLogger(log4js.getLogger('connectLog'), {
        level: 'auto'
        //format: ':remote-addr :method :url :status :referrer :user-agent'
    }))
}

export { logger, use }