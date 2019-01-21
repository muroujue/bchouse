import Vuex from 'vuex'
// import Settings from '~/settings'
// import core from '~/plugins/core'

const createStore = () => {
  return new Vuex.Store({
    state: {
      address:null,
      networkId:null,
      betValue:null,
      locales:['cn','en','ru', 'kr', 'jp'],
      locale: 'en'
    },
    getters: {

    },
    mutations: {
      setAddress(state,address){
        state.address = address
      },
      setNetworkId(state,networkId){
        state.networkId = networkId
      },
      setBetValue(state,betValue){
        state.betValue = betValue
      },
      setLang(state, locale) {
        state.locale = locale
      }
    }
  })
}

export default createStore