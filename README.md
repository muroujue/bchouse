# fair-house webapp
### web3的安装和使用
**相关网址：**
https://github.com/ethereum/web3.js
http://web3.tryblockchain.org/
1. 如果win上没有安装visual studio和python，需要运行`npm install --global --production windows-build-tools`
2. 安装之后，在vue中使用web3，nuxt项目中在plugins新建web3.js。web3只能在客户端使用，所有代码需要在mounted中调用。
```js
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
  jsweb3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
}
Vue.prototype.$web3 = jsweb3
```
3. 建立智能合约
```
this.myContract = new this.$web3.eth.Contract(abi, contractAddress)
```
4. 获取用户地址和链接网络
```
getWeb3() {
  if (this.$web3.currentProvider.isMetaMask) {
    this.$web3.eth.getAccounts().then((data) => {
      if (data.length > 0) {
        this.$store.commit('setAddress', data[0].toLowerCase())
      } else {
        this.$store.commit('setAddress', null)
      }
    })
    this.$web3.eth.net.getId().then((data) => {
      this.$store.commit('setNetworkId', data)
    })
  } else {
    this.$store.commit('setAddress', null)
    this.$store.commit('setNetworkId', null)
  }
}
```

### metamask使用教程
https://kovan.etherscan.io/address/0xc0875d11707230b769d29d295dbdf7d188063753
