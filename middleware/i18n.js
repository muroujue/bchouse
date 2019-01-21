export default function ({ app, store }) {
  const defaultLocale = app.i18n.fallbackLocale
  let locale = defaultLocale
  if (process.server && app.$cookies.cookies && app.$cookies.cookies.i18nextLng) {
    locale = app.$cookies.cookies.i18nextLng
  } else if (store.state.locale) {
    locale = store.state.locale
  }
  store.commit('setLang', locale)
  app.$cookies.set('i18nextLng',locale)
  app.i18n.locale = locale
}
