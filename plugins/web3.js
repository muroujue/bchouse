import Web3 from 'web3'
import Vue from 'vue'
/*
* 1. Check for injected web3 (mist/metamask)
* 2. If metamask/mist create a new web3 instance and pass on result
* 3. Get networkId - Now we can check the user is connected to the right network to use our dApp
* 4. Get user account from metamask
* 5. Get user balance
*/

let jsweb3 = window.web3
if (typeof web3 !== 'undefined') {
  jsweb3 = new Web3(web3.currentProvider)
} else {
  jsweb3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/mew'))
}
Vue.prototype.$web3 = jsweb3