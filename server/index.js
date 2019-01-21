import express from 'express'
import { Nuxt, Builder } from 'nuxt'
import api from './api'
import error from './error'

const app = express()
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3882

app.set('port', port)

if (process.env.NODE_ENV === "development"){

  app.all('*',function(req,res,next){
    res.setHeader("Access-Control-Allow-Origin","*")
    res.setHeader("Access-Control-Allow-Headers","X-Requested-With")
    res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS")
    res.setHeader("Content-Type","application/json;charset=utf-8")
    next()
  })
}

// Import API Routes
app.use('/api', api)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

// Give nuxt middleware to express
app.use(nuxt.render)

// log errors
app.use(error)

// Listen the server
app.listen(port, host)
console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
