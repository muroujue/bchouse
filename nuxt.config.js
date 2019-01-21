const remjs = 'var deviceWidth = document.documentElement.clientWidth;document.documentElement.style.fontSize = deviceWidth / 10 + "px";window.onresize = function () {var deviceWidth = document.documentElement.clientWidth;document.documentElement.style.fontSize = deviceWidth / 10 + "px"};'
const gajs = '(function(){var ga = document.createElement("script"); ga.type = "text/javascript"; ga.async = true;ga.src = "https://www.googletagmanager.com/gtag/js?id=UA-126205644-1";var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ga, s);})();window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);};gtag("js", new Date());gtag("config", "UA-126205644-1");'

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    script:[
      { innerHTML: remjs + gajs, type: 'text/javascript' }
    ],
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, height=device-height, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0' },
      // { hid: 'keywords', name: 'keywords', content: '' },
      // { hid: 'description', name: 'description', content: '' },
      { hid: 'http-equiv', 'http-equiv': 'X-UA-Compatible', content: 'IE=edge,chrome=1' },
      { hid: 'http-equiv', 'http-equiv': 'cache-control', content: 'no-cache' },
      { hid: 'applicable-device', name: 'applicable-device', content: 'mobile' },
      { hid: 'apple-mobile-web-app-capable', name: 'apple-mobile-web-app-capable', content: 'yes' },
      { hid: 'apple-mobile-web-app-status-bar-style', name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
      { hid: 'format-detection', name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    __dangerouslyDisableSanitizers: ['script']
  },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/main.scss',
    'element-ui/lib/theme-chalk/index.css'
  ],
  /*
  ** Plugins
  */
  plugins: [
    { src: '~plugins/element-ui', ssr: true },
    { src: '~plugins/cookies', ssr: true },
    { src: '~plugins/web3', ssr: false },
    { src: '~plugins/clipboard', ssr: false },
    { src: '~plugins/i18n', ssr: true }
  ],
  /*
  ** Add axios,mint-ui,vue-cookie globally
  */
  build: {
    // analyze: true,
    vendor: ['axios', 'element-ui'],
    // babel: {
    //   'plugins': [['component', [
    //     {
    //       "libraryName": "element-ui",
    //       "styleLibraryName": "theme-chalk"
    //     },
    //     'transform-async-to-generator',
    //     'transform-runtime'
    //   ]]],
    //   comments: true
    // },
    /*
    ** Run ESLINT on save
    */
    extend (config) {
      const inlineSizeThreshold = 10000
      config.module.rules.filter(v => v.test.toString() === String(/\.(png|jpe?g|gif|svg)$/)).map(v => { v.options.limit = inlineSizeThreshold })
      config.module.rules.filter(v => v.test.toString() === String(/\.(woff2?|eot|ttf|otf)(\?.*)?$/)).map(v => { v.options.limit = inlineSizeThreshold })
      if (process.client) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  modules: ['@nuxtjs/axios'],
  axios: {
    proxy: true
  },
  proxy: {
    '/v1': 'https://testapi.fairhouse.io'
  },
  router: {
    extendRoutes(routes,resolve) {
      routes.push({
        name: 'index-user',
        path: '/:user',
        component: 'pages/index.vue'
      })
    },
    middleware: [
      'i18n'
    ]
  }
}
