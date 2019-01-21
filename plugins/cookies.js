import Vue from 'vue'
import Cookie from 'cookie'
import JSCookie from 'js-cookie'

// Called only on client-side
export const getCookies = (str) => {
  return Cookie.parse(str || '')
}

/*
** Executed by ~/.nuxt/index.js with context given
** This method can be asynchronous
*/
export default ({ req , res }, inject) => {
  // Inject `cookies` key
  // -> app.$cookies
  // -> this.$cookies in vue components
  // -> this.$cookies in store actions/mutations
  inject('cookies', new Vue({
    data: () => ({
      cookies: getCookies(process.server ? req.headers.cookie : document.cookie)
    }),
    methods: {
      set(...args) {
        if (process.server) {
          res.cookie(...args)
          let reqCookie = getCookies(req.headers.cookie)
          reqCookie[args[0]] = args[1]
          this.cookies = reqCookie
        } else {
          JSCookie.set(...args)
          this.cookies = getCookies(document.cookie)
        }
        // process.server ? res.cookie(...args) : JSCookie.set(...args)
        // if (process.server){
        //   let currentCookie = {}
        //   currentCookie[args[0]] = [args[1]]
        //   this.cookies = { ...getCookies(req.headers.cookie) , ...currentCookie }
        // } else {
        //   this.cookies = getCookies(document.cookie)
        // }
        // this.cookies = getCookies(process.server ? req.headers.cookie : document.cookie)
      },
      remove(...args) {
        JSCookie.remove(...args)
      }
    }
  }))
}