import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export default ({ app, store }) => {
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  app.i18n = new VueI18n({
    locale: store.state.locale,
    fallbackLocale: 'en',
    messages: {
      'cn': require('~/settings/lang/cn.json'),
      'en': require('~/settings/lang/en.json'),
      'ru': require('~/settings/lang/ru.json'),
      'jp': require('~/settings/lang/jp.json'),
      'kr': require('~/settings/lang/kr.json')
    }
  })
}

