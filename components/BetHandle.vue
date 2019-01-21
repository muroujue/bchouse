<template>
  <div class="betWrap">
    <div class="betInn">
      <div class="handle">
          <div class="btn_choose">
              <span :class="[0.1>maxValue?'gray':'']" @click="setBet(0.1)">0.1</span>
              <span :class="[0.15>maxValue?'gray':'']" @click="setBet(0.15)">0.15</span>
              <span :class="[0.2>maxValue?'gray':'']" @click="setBet(0.2)">0.2</span>
              <span @click="setBet(maxValue)">{{ $t('betHandleZone.biggest') }}</span>
          </div>
          <div class="fillin">
              <span class="reduce" @click="reduce"><img src="~/assets/img/ico_reduce.png" alt=""></span>
              <input type="tel" v-model.number="betValue" @blur="valueFixed" @input="handleInput">
              <span class="add" @click="add"><img src="~/assets/img/ico_add.png" alt=""></span>
          </div>
      </div>
      <p class="desc">{{ $t('betHandleZone.yourBet') }}</p>
      <div class="play_bottom">
        <!-- <meta-mask v-if="metaMaskShow || $store.state.networkId != 1" :showLogin="metaMaskLogin" :metaMaskBf="metaMaskShow"></meta-mask> -->
        <div class="play_btn" @click="getRandom"><span>{{$t('btnTxt.bet')}}</span></div>
      </div>
    </div>
    <div class="ethMask" v-show="emShow">
      <div class="loading" v-if="ethmaskState===1 || ethmaskState===2 || ethmaskState===3">
        <i class="ethLogo"><img src="~/assets/img/eth.png" alt=""></i>
        <p v-if="ethmaskState===1" v-html="$t('betHandleZone.mastState')[0]"></p>
        <p v-else-if="ethmaskState===2" v-html="$t('betHandleZone.mastState')[1]"></p>
        <p v-else v-html="$t('betHandleZone.mastState')[2]"></p>
      </div>
      <div class="result" v-if="ethmaskState===4 || ethmaskState===5">
          <div class="error" v-if="ethmaskState===5"><span>{{ $t('betHandleZone.result.failText1') }}</span></div>
          <div class="success" v-else>
            <div class="win" v-if="isWin">
              <p>{{ $t('betHandleZone.result.winText1') }}</p>
              <p class="amount"><strong>{{winAmount}}</strong>ETH</p>
            </div>
            <div v-else class="fail">{{ $t('betHandleZone.result.failText2') }}</div>
            <div class="maskshow">
              <ul class="game1" v-if="gameId=='1'">
                <li>
                  <p>{{ $t('betHandleZone.result.info1') }}</p>
                  <span :class="[betMask=='1'?'coin_front':'coin_end']"></span>
                </li>
                <li>
                  <p>{{ $t('betHandleZone.result.info2') }}</p>
                  <span :class="[gameMask=='1'?'coin_front':'coin_end']"></span>
                </li>
              </ul>
              <ul class="game2" v-if="gameId=='2'">
                <li>
                  <p>{{ $t('betHandleZone.result.info1') }}</p>
                  <span class="dice1" v-if="betMask.indexOf(1) > -1"></span>
                  <span class="dice2" v-if="betMask.indexOf(2) > -1"></span>
                  <span class="dice3" v-if="betMask.indexOf(3) > -1"></span>
                  <span class="dice4" v-if="betMask.indexOf(4) > -1"></span>
                  <span class="dice5" v-if="betMask.indexOf(5) > -1"></span>
                  <span class="dice6" v-if="betMask.indexOf(6) > -1"></span>
                </li>
                <li>
                  <p>{{ $t('betHandleZone.result.info2') }}</p>
                  <span class="dice1" v-if="gameMask.indexOf(1) > -1"></span>
                  <span class="dice2" v-if="gameMask.indexOf(2) > -1"></span>
                  <span class="dice3" v-if="gameMask.indexOf(3) > -1"></span>
                  <span class="dice4" v-if="gameMask.indexOf(4) > -1"></span>
                  <span class="dice5" v-if="gameMask.indexOf(5) > -1"></span>
                  <span class="dice6" v-if="gameMask.indexOf(6) > -1"></span>
                </li>
              </ul>
              <ul class="game2" v-if="gameId=='3'">
                <li>
                  <p>{{ $t('betHandleZone.result.info1') }}</p>
                  <span class="twoDice" v-for="(item,index) in betMask.split(',')" :key="index">{{item}}</span>
                </li>
                <li>
                  <p>{{ $t('betHandleZone.result.info2') }}</p>
                  <span v-for="(item,index) in gameMask.split(',')" :key="index" :class="'dice'+item"></span>
                </li>
              </ul>
              <ul class="game4" v-if="gameId=='4'">
                <li>
                  <p>{{ $t('betHandleZone.result.info1') }}</p>
                  <span class="slideVal">{{betMask}}</span>
                </li>
                <li>
                  <p>{{ $t('betHandleZone.result.info2') }}</p>
                  <span class="slideVal">{{gameMask}}</span>
                </li>
              </ul>
            </div>
          </div>
          <p class="btn"><span @click="playAgain">{{ $t('btnTxt.playAgain') }}</span></p>
      </div>
    </div>
  </div>
</template>

<script>
import MetaMask from '~/components/MetaMask'
import abi from '~/settings/fairhouse_sol_FairHouse'
import axios from '~/plugins/axios'
import toMask from '~/settings/display_to_mask.json'
import contractAddress from '~/settings/contractAddress.js'
import { winRatio,getmodulo } from '~/plugins/utils'
import BigNumber from 'bignumber.js'
import firework from '~/plugins/fireworks'

export default {
  components:{
    MetaMask
  },
  props:{
    gameId:String,
    betMask:String
  },
  data() {
    return {
      betValue: 0.10,
      maxValue: 0.10,
      minValue: 0.01,
      metaMaskShow:true,
      metaMaskLogin:false,
      networkType:'',
      myContract:null,
      commitLastBlock:null,
      commit:null,
      r:null,
      s:null,
      gasPrice:null,
      ethmaskState:null,
      betStatus:null,
      betimer:null,
      emShow: false,
      isWin: false,
      isJpWin:false,
      gameMask:null,
      winAmount:0,
      timer:null
    };
  },
  computed:{
    modulo() {
      return getmodulo(this.gameId)
    }
  },
  mounted() {
    this.getWeb3()
    this.timer = setInterval(()=>{
      this.getWeb3()
    },10000)
    // myContract
    this.myContract = new this.$web3.eth.Contract(abi, contractAddress)
    // console.log(this.myContract)
    // console.log('8*************')
    this.$store.commit('setBetValue', this.betValue)
    let winRatioStr = winRatio(this.modulo,this.betMask)
    this.maxValue = this.getMaxAmount(winRatioStr)
  },
  methods: {
    getWeb3() {
      if (this.$web3.currentProvider.isMetaMask) {
        this.metaMaskLogin = true
        this.$web3.eth.getAccounts().then((data) => {
          if (data.length > 0) {
            this.metaMaskShow = false
            this.$store.commit('setAddress', data[0].toLowerCase())
          } else {
            this.metaMaskShow = true
            this.$store.commit('setAddress', null)
          }
        })
        this.$web3.eth.net.getId().then((data) => {
          this.$store.commit('setNetworkId', data)
        })
      } else {
        this.metaMaskShow = true
        this.metaMaskLogin = false
        this.$store.commit('setAddress', null)
        this.$store.commit('setNetworkId', null)
      }
    },
    getRandom() {
      // console.log(this.$store.state.address)
      axios.put('/v1/random',{
        address : this.$store.state.address,
        networkId: this.$store.state.networkId
      }).then((res) => {
        let data = res.data
        this.commitLastBlock = this.$web3.utils.toTwosComplement(data.secret.commitLastBlock)
        this.commit = this.$web3.utils.toTwosComplement(data.secret.commit)
        this.r = this.$web3.utils.hexToBytes(data.secret.signature.r)
        this.s= this.$web3.utils.hexToBytes(data.secret.signature.s)
        this.gasPrice = data.gasPrice
        this.betOn()
      })
    },
    handleInput(e){
      this.betValue = e.target.value.replace(/[^\d.]/g,"").replace(/\.{2,}/g,".")
    },
    setBet(val) {
      console.log(val)
      if (val > this.maxValue) return
      this.betValue = val
      this.$store.commit('setBetValue', this.betValue)
    },
    valueFixed() {
      let value = this.betValue
      if (value == '') {
        this.betValue = 0.1
      } else if (value > this.maxValue){
        this.betValue = this.maxValue
      } else {
        this.betValue = parseFloat(parseFloat(this.betValue).toFixed(2))
      }
      this.$store.commit('setBetValue', this.betValue)
    },
    add() {
      if (this.betValue < this.maxValue) {
        this.betValue += 0.01
        this.betValue = parseFloat(this.betValue.toFixed(2))
        this.$store.commit('setBetValue', this.betValue)
      }
    },
    reduce() {
      if (this.betValue > this.minValue && this.betValue > 0.01) {
        this.betValue -= 0.01
        this.betValue = parseFloat(this.betValue.toFixed(2))
        this.$store.commit('setBetValue', this.betValue)
      }
    },
    playAgain(){
      this.$emit('ethmask', false)
      this.emShow = false
    },
    goFirework(w,l,ele){
      new firework(w,l,ele)
    },
    betOn() {
      this.$emit('ethmask', true)
      this.emShow = true
      this.ethmaskState = 1
      let betMask = this.$web3.utils.toTwosComplement(toMask[this.modulo][this.betMask])
      let modulo = this.$web3.utils.toTwosComplement(this.modulo)
      let recCodeStr = this.$cookies.cookies.recCode ? this.$cookies.cookies.recCode : ''
      let recCode = this.$web3.utils.hexToBytes(this.$web3.utils.asciiToHex(recCodeStr))
      let message = {
        from: this.$store.state.address,
        value:this.$web3.utils.toWei(this.betValue.toString()),
        gas:600000,
        gasPrice:this.gasPrice
      }
      this.myContract.methods.placeBet(betMask,modulo,this.commitLastBlock,this.commit,recCode,this.r,this.s).send(message,()=>{
        this.ethmaskState = 2
      }).on("receipt", (receipt) => {
        // console.log(receipt)
        this.betimer = setInterval(()=>{
          this.getBetResult(receipt.transactionHash)
        },2000)
      }).on("error", (error) => {
        this.ethmaskState = 5
        console.log(error)
      })
    },
    getMaxAmount(winRatioStr) {
      let winRatioBN = new BigNumber(winRatioStr.toString())
      let a = new BigNumber('1').div(winRatioBN)
      let b = a.minus(new BigNumber('1.01'))
      let c = new BigNumber('5.0') // max profit
      let d = new BigNumber('0.001').plus(c).div(b)
      let maxAmount = new BigNumber('1.01').times(d)
      //return parseFloat(maxAmount.toNumber().toFixed(2))
      console.log(maxAmount.toNumber())
      return Math.round(maxAmount.toNumber() * 100) / 100
    },
    isDiceWin(betMask, gameMask){
      if (this.modulo == 2) {
          return (betMask == gameMask)
      } else if (this.modulo == 6) {
          let arr = betMask.split(',')
          return arr.includes(gameMask)
      } else if (this.modulo == 36) {
          let arr = betMask.split(',')
          let gameArr = gameMask.split(',')
          return arr.includes((parseInt(gameArr[0]) + parseInt(gameArr[1])).toString())
      } else if (this.modulo == 100) {
          return parseInt(gameMask) <= parseInt(betMask)
      }
    },
    isJackpotWin(jackpotMask){
      return (jackpotMask == '1000')
    },
    getWinAmount(diceWinAmount, jackpotWinAmount){
      return parseFloat(this.$web3.utils.fromWei((parseInt(diceWinAmount) + parseInt(jackpotWinAmount)).toString())).toFixed(3)
    },
    getBetResult(txHash) {
      axios.get('/v1/bet_result',{
        params : {
          gameId : parseInt(this.gameId),
          networkId:this.$store.state.networkId,
          address:this.$store.state.address,
          txHash:txHash
        }
      }).then((res) => {
        this.betStatus = res.data.status
        if (this.betStatus==11) {
          this.ethmaskState = 3
        } else if (this.betStatus==21 || this.betStatus==30 || this.betStatus==40 || this.betStatus==41) {
          clearInterval(this.betimer)
          if (this.betStatus==21) {
            this.ethmaskState = 4
            this.isWin = this.isDiceWin(this.betMask,res.data.gameMask) || this.isJackpotWin(res.data.jackpotMask)
            if (this.isWin) {
              let ele = document.querySelector('.ethMask')
              this.goFirework(400,150,ele)
              setTimeout(this.goFirework(300,230,ele),700)
              setTimeout(this.goFirework(450,240,ele),1300)
              setTimeout(this.goFirework(280,170,ele),2200)
            }
            this.isJpWin = this.isJackpotWin(res.data.jackpotMask)
            this.gameMask = res.data.gameMask
            this.winAmount = this.getWinAmount(res.data.dicePayment,res.data.jackpotPayment)
          } else {
            this.ethmaskState = 5
          }
        }
      })
    }
  },
  watch: {
    betMask(val){
      let winRatioStr = winRatio(this.modulo,val)
      this.maxValue = this.getMaxAmount(winRatioStr)
      if (this.betValue>this.maxValue) {
        this.betValue = this.maxValue
      }
    }
  },
  destroyed() {
    clearInterval(this.timer)
  }
};
</script>
<style scoped lang="scss">
.betWrap{
  .betInn{
    .handle {
      width: 340px;
      margin: 25px auto 15px;
      .btn_choose {
        display: flex;
        span {
          flex: 1;
          background: #576aa5;
          font-size: 14px;
          margin: 0 5px;
          height: 36px;
          line-height: 36px;
          border-radius: 5px;
          cursor: pointer;
          &.gray{
            opacity: .4;
          }
        }
      }
      .fillin {
        margin-top: 10px;
        input {
          width: 200px;
          height: 70px;
          line-height: 70px;
          background: #232c37;
          border-radius: 5px;
          color: #fff;
          font-size: 36px;
          text-align: center;
          vertical-align: middle;
          margin: 0 20px;
          letter-spacing: 3px;
        }
        img {
          vertical-align: middle;
          cursor: pointer;
        }
      }
    }
    .play_btn {
      padding-bottom: 70px;
      span {
        display: block;
        width: 320px;
        height: 70px;
        line-height: 70px;
        margin: 0 auto;
        background: url(~/assets/img/btn_1.png) no-repeat 0 0;
        background-size:100% auto;
        font-size: 26px;
        color: #fff;
        transition: background 1s ease;
        cursor: pointer;
        box-shadow: 0 0 25px rgba(28, 35, 45, 0.7);
        &:hover {
          background: url(~/assets/img/btn_2.png) no-repeat 0 0;
          background-size:100% auto;
        }
      }
    }
  }
  .ethMask{
      position: absolute;
      top:0;
      bottom:0;
      left:0;
      right:0;
      z-index:11;
      text-align:center;
      padding-bottom: 100px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .loading{
          .ethLogo{
              img{
                  width:40px;
                  animation: eth-loading 2.5s 0s linear infinite;
              }
          }
          p{
              margin-top: 30px;
          }
      }
      .result{
          width:90%;
          .error{
              background: rgba(255,255,255,.25);
              border-radius: 5px;
              min-height:80px;
              margin-bottom: 30px;
              display: flex;
              // flex-direction: column;
              justify-content: center;
              align-items: center;
          }
          .success{
            background: rgba(255,255,255,.25);
            border-radius: 5px;
            min-height:80px;
            margin-bottom: 30px;
            padding:15px;
            .fail{
              margin-bottom: 10px;
            }
            .win{
              p{
                margin-bottom:10px;
                &.amount{
                  strong{
                    font-size:24px;
                    margin-right:5px;
                  }
                }
              }
            }
            .maskshow{
              ul{
                display: flex;
                &.game1{
                  li{
                    span{
                      width:90px;
                      height: 90px;
                    }
                  }
                }
                li{
                  flex:1;
                  text-align: center;
                  padding:10px 0;
                  p{
                    margin-bottom: 10px;
                    height: 50px;
                  }
                  &:first-child{
                    border-right:1px solid #fff;
                  }
                  span{
                    display: inline-block;
                    width: 40px;
                    height: 40px;
                    margin: 0 5px 5px;
                    &.coin_front{
                      background: url(~/assets/img/ico_coin1_1.png) no-repeat 0 0;
                      background-size: 100% auto;
                    }
                    &.coin_end{
                      background: url(~/assets/img/ico_coin2_1.png) no-repeat 0 0;
                      background-size: 100% auto;
                    }
                    &.dice1{
                      background: url(~/assets/img/dice1_1.png) no-repeat 0 0;
                      background-size: 100% auto;
                    }
                    &.dice2{
                      background: url(~/assets/img/dice2_1.png) no-repeat 0 0;
                      background-size: 100% auto;
                    }
                    &.dice3{
                      background: url(~/assets/img/dice3_1.png) no-repeat 0 0;
                      background-size: 100% auto;
                    }
                    &.dice4{
                      background: url(~/assets/img/dice4_1.png) no-repeat 0 0;
                      background-size: 100% auto;
                    }
                    &.dice5{
                      background: url(~/assets/img/dice5_1.png) no-repeat 0 0;
                      background-size: 100% auto;
                    }
                    &.dice6{
                      background: url(~/assets/img/dice6_1.png) no-repeat 0 0;
                      background-size: 100% auto;
                    }
                    &.twoDice{
                      width:48px;
                      height: 42px;
                      line-height: 42px;
                      color:#333;
                      background: url(~/assets/img/ico_dice2_on.png) no-repeat 0 0;
                      background-size: 100% auto;
                    }
                    &.slideVal{
                      background: rgba(255,255,255,0.5);
                      width:90px;
                      height:90px;
                      border-radius: 100%;
                      color:#fff;
                      line-height: 90px;
                      font-size:30px;
                    }
                  }
                }
              }
            }
          }
          .btn{
              span{
                  display: inline-block;
                  width:120px;
                  height:36px;
                  border:2px solid #fff;
                  border-radius: 5px;
                  line-height: 34px;
                  cursor: pointer;
              }
          }
      }
  }
}
@keyframes eth-loading {
    0% {
        opacity: 0.7;
        transform: scale(1);
    }
    50% {
        opacity: 1;
        transform: scale(1.2);
    }
    100% {
        opacity: 0.7;
        transform: scale(1);
    }
}

@media screen and (max-width: 500px) {
  .betInn{
    .handle {
      width: 100%;
      margin: 15px auto 10px;
      .fillin {
        margin-top: 10px;
        input {
          width: 160px;
          height: 50px;
          line-height: 50px;
          background: rgba(255, 255, 255, 0.9);
          font-size: 26px;
          margin: 0 20px;
          color: #232c37;
        }
        img {
          vertical-align: middle;
          width: 30px;
        }
      }
    }
    .play_btn {
      margin:20px 0;
      padding-bottom: 10px;
      span {
        width: 260px;
        height: 58px;
        line-height:58px;
        font-size: 22px;
      }
    }
  }
}
</style>