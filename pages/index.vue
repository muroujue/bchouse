<template>
  <div class="index">
    <h1>{{ $t('homePageIntro.title') }}</h1>
    <h2><a href="/faq">{{ $t('homePageIntro.stress') }}</a>{{ $t('homePageIntro.text1') }}<br>{{ $t('homePageIntro.text2') }}</h2>
    <ul class="infor">
      <li>
        <h3>{{ $t('homePageUnit.2hbet.title') }}</h3>
        <p><strong>{{tweenEths.wagersAmount.toFixed(3)}}</strong>ETH</p>
        <span class="tip">{{ $t('homePageUnit.2hbet.text') }} {{dataForLastDay.wagers.bets}}</span>
      </li>
      <li>
        <h3>{{ $t('homePageUnit.jackpot.title') }}</h3>
        <div v-if="dataForLastDay.jackpot.address">
          <p><strong>{{tweenEths.jackpotAmount.toFixed(3)}}</strong>ETH</p>
          <span class="tip">{{ $t('homePageUnit.jackpot.text') }} <a :href="getAddress(dataForLastDay.jackpot.address)" target="_blank">{{dataForLastDay.jackpot.address}}</a></span>
        </div>
        <div class="nodata" v-else>{{ $t('nodata') }}</div>
      </li>
      <li>
        <h3>{{ $t('homePageUnit.winner.title') }}</h3>
        <ol v-if="dataForLastDay.winners.length > 0">
          <li class="clearfix" v-for="(item,index) in dataForLastDay.winners" :key="index"><i>{{index+1}}</i><a :href="getAddress(item.address)" target="_blank" class="same">{{item.address}}</a><span><strong>{{item.amount}}</strong> ETH</span></li>
        </ol>
        <div class="nodata" v-else>{{ $t('nodata') }}</div>
      </li>
    </ul>
    <div class="mine" v-if="userName">
      <dl>
        <dt>{{ $t('mySpread.text1') }}<strong>{{urlpath}}</strong><button v-clipboard="urlpath" class="copy" @success="copySuccess"><img src="~/assets/img/ico_copy.png" alt=""><s>{{ $t('mySpread.copy') }}</s></button></dt>
        <dd><span>{{ $t('mySpread.text2') }}<i>{{tgNum}}</i></span><span>{{ $t('mySpread.text3') }}<i>{{ethNum}} ETH</i></span></dd>
      </dl>
    </div>
    <div class="newBnr" v-if="!userName">
      <img src="~/assets/img/bg_news.png" alt="">
      <p><span v-html="$t('bnrInfo.text')"></span><i @click="showPop">&nbsp;{{ $t('bnrInfo.btnText') }}&nbsp;</i></p>
    </div>
    <ul class="games">
      <li>
        <p class="ico"><img src="~/assets/img/ico_dollar.png" alt=""></p>
        <dl>
          <dt v-html="$t('gamesInfo.game1.title')"></dt>
          <dd v-html="$t('gamesInfo.game1.desc')"></dd>
        </dl>
        <p class="btn">
          <img src="~/assets/img/blank.png" alt="">
          <nuxt-link to="/games/coin-flip"><span>{{$t('btnTxt.startPlay')}}</span></nuxt-link>
        </p>
      </li>
      <li>
        <p class="ico"><img src="~/assets/img/ico_dice.png" alt=""></p>
        <dl>
          <dt v-html="$t('gamesInfo.game2.title')"></dt>
          <dd v-html="$t('gamesInfo.game2.desc')"></dd>
        </dl>
        <p class="btn">
          <img src="~/assets/img/blank.png" alt="">
          <nuxt-link to="/games/dice"><span>{{$t('btnTxt.startPlay')}}</span></nuxt-link>
        </p>
      </li>
      <li>
        <p class="ico"><img src="~/assets/img/ico_dicedb.png" alt=""></p>
        <dl>
          <dt v-html="$t('gamesInfo.game3.title')"></dt>
          <dd v-html="$t('gamesInfo.game3.desc')"></dd>
        </dl>
        <p class="btn">
          <img src="~/assets/img/blank.png" alt="">
          <nuxt-link to="/games/two-dice"><span>{{$t('btnTxt.startPlay')}}</span></nuxt-link>
        </p>
      </li>
      <li>
        <p class="ico"><img src="~/assets/img/ico_etheroll.png" alt=""></p>
        <dl>
          <dt v-html="$t('gamesInfo.game4.title')"></dt>
          <dd v-html="$t('gamesInfo.game4.desc')"></dd>
        </dl>
        <p class="btn">
          <img src="~/assets/img/blank.png" alt="">
          <nuxt-link to="/games/etheroll"><span>{{$t('btnTxt.startPlay')}}</span></nuxt-link>
        </p>
      </li>
    </ul>
    <el-dialog :visible.sync="namePopVisible" center>
      <div class="eldMain">
        <h3>{{ $t('namePopInfo.title') }}</h3>
        <p class="nameTxt"><span>{{ $t('namePopInfo.tip') }}</span><input type="text" @focus="delError" :class={errorRed:userNameError} :placeholder="$t('namePopInfo.placeholder')" v-model.trim="userInput" maxlength="32"></p>
        <div class="guide">
          <p>{{ $t('namePopInfo.guideTit') }}</p>
          <ul>
            <li>{{ $t('namePopInfo.guide1') }}</li>
            <li>{{ $t('namePopInfo.guide2') }}</li>
            <li>{{ $t('namePopInfo.guide3') }}</li>
            <li>{{ $t('namePopInfo.guide4') }}</li>
            <li>{{ $t('namePopInfo.guide5') }}</li>
            <li>{{ $t('namePopInfo.guide6') }}</li>
          </ul>
          <p>{{ $t('namePopInfo.text1') }}</p>
          <p>{{ $t('namePopInfo.text2') }}</p>
        </div>
        <p class="btn"><span class="el-button el-button--primary" @click="purchase">{{ $t('namePopInfo.btnText') }}</span></p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import TWEEN from '@tweenjs/tween.js'
import { mapState } from 'vuex'
import abi from '~/settings/fairhouse_sol_FairHouse'
import contractAddress from '~/settings/contractAddress.js'

export default {
  data(){
    return {
      eths:{
        wagersAmount:0,
        jackpotAmount:0
      },
      tweenEths: {
        wagersAmount:0,
        jackpotAmount:0
      },
      timer:null,
      myContract:null,
      gasPrice:null,
      userInput:'',
      userName:null,
      urlpath:null,
      namePopVisible:false,
      userNameError:false,
      tgNum:0,
      ethNum:0
    }
  },
  async asyncData({ app, params, error }) {
    try {
      let recCode = (app.$cookies.cookies && app.$cookies.cookies.recCode) ? app.$cookies.cookies.recCode : ''
      let dataForLastDay = {
        "wagers": {
          "bets": 0,
          "amount": null
        },
        "jackpot":{
          "address": '',
          "amount": ''
        },
        "winners": []
      }
      let res_24h = await axios.get('/v1/24h')
      if (res_24h.data) {
        dataForLastDay.wagers = res_24h.data.wagers
        dataForLastDay.winners = res_24h.data.winners
        if (res_24h.data.jackpot) {
          dataForLastDay.jackpot = res_24h.data.jackpot
        }
      }
      return {
        dataForLastDay,
        recCode
      }
    } catch (err) {
      error({ statusCode: 500, message: 'Oops, An Error Occurred' })
    }
  },
  head () {
    return {
      title: this.$t('metaData.title'),
      meta:[
        { hid: 'description', name: 'description', content:this.$t('metaData.description') },
        { hid: 'keywords', name: 'keywords', content:this.$t('metaData.keywords') }
      ]
    }
  },
  computed:{
    ...mapState([
      'address',
      'networkId'
    ])
  },
  mounted() {
    // console.log(this.$t('links'))
    this.myContract = new this.$web3.eth.Contract(abi, contractAddress)
    this.amountToEth()
    this.eths.wagersAmount = parseFloat(this.dataForLastDay.wagers.amount)
    this.eths.jackpotAmount = parseFloat(this.dataForLastDay.jackpot.amount)
    this.runNumber()
    setTimeout(()=>{
        this.getRegisterName()
    },1000)
    // console.log(this.$web3.eth)
    // this.$web3.eth.getAccounts().then((data) => {
    //   this.$store.commit('setAddress', data[0])
    // })
    // this.$web3.eth.net.getId().then((data) => {
    //   this.$store.commit('setNetworkId', data)
    // })
    // get 24h data
    this.getLastDayData()
    this.timer = setInterval(this.getLastDayData,10000)
  },
  methods: {
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
    },
    delError(){
      this.userNameError = false
    },
    showPop(){
      this.namePopVisible = true
    },
    getRandom(callback) {
      axios.put('/v1/random',{
        address : this.$store.state.address,
        networkId: this.$store.state.networkId
      }).then((res) => {
        let data = res.data
        this.gasPrice = data.gasPrice
        callback()
      })
    },
    purchase(){
      this.getRandom(this.register)
    },
    validateName(name) {
      const nameReg = /^(?!\d+$)[\da-zA-Z]+$/
      if (name) {
          if (!nameReg.test(name)) {
            this.userNameError = true
            this.$message.error(this.$t('tipToolsText.text1'))
          } else {
            return true
          }
      } else {
        this.userNameError = true
        this.$message.error(this.$t('tipToolsText.text2'))
        return false
      }
    },
    getRegisterName(){
      // console.log(this.$store.state.address)
      this.myContract.methods.getRegisterName(this.$store.state.address).call().then((result)=>{
        let user = this.$web3.utils.hexToString(result)
        if (user) {
          this.userName = user
          this.urlpath = `https://www.fairhouse.io/r/${user}`
          this.recommend()
        }
      })
    },
    recommend() {
      axios.get('/v1/recommended',{
        params : {
          networkId : this.$store.state.networkId,
          address: this.$store.state.address
        }
      }).then((res) => {
        console.log(res.data)
        this.tgNum = res.data.count
        this.ethNum = parseFloat(this.$web3.utils.fromWei(res.data.rewards.toString())).toFixed(3)
      })
    },
    register(){
      if (this.validateName(this.userInput)) {
        let recCode = this.$web3.utils.hexToBytes(this.$web3.utils.asciiToHex(this.recCode))
        let betValue = 0.05
        let message = {
          from: this.$store.state.address,
          value:this.$web3.utils.toWei(betValue.toString()),
          gas:500000,
          gasPrice:this.gasPrice
        }
        this.myContract.methods.registerName(this.userInput,recCode).send(message).on("receipt",(receipt)=>{
          // console.log('&^*())********')
          // console.log(receipt)
          this.$message({
            showClose: true,
            message: this.$t('tipToolsText.text3'),
            type: 'success'
          })
          this.getRegisterName()
          this.namePopVisible = false
          // console.log('****************')
        }).on("error", (error) => {
          // console.log('#################')
          console.log(error)
          // console.log('#################')
        })
      }
    },
    animate() {
      if (TWEEN.update()) {
        requestAnimationFrame( this.animate )
      }
    },
    runNumber() {
      let tween = new TWEEN.Tween( this.tweenEths )
        .to( this.eths , 3000 )
        .easing( TWEEN.Easing.Circular.Out )
        .start()
      this.animate()
    },
    amountToEth() {
      if (this.dataForLastDay.wagers.amount) {
        this.dataForLastDay.wagers.amount = this.$web3.utils.fromWei(this.dataForLastDay.wagers.amount)
      }
      if (this.dataForLastDay.jackpot.amount) {
        this.dataForLastDay.jackpot.amount = this.$web3.utils.fromWei(this.dataForLastDay.jackpot.amount)
      }
      if (this.dataForLastDay.winners.length > 0) {
        this.dataForLastDay.winners.map((item) => item.amount = parseFloat(this.$web3.utils.fromWei(item.amount)).toFixed(3))
      }
    },
    copySuccess() {
      this.$message(this.$t('tipToolsText.text4'))
    },
    getLastDayData() {
      this.getWeb3()
      axios.get('/v1/24h').then((res) => {
        this.dataForLastDay.wagers = res.data.wagers
        if (res.data.jackpot) {
          this.dataForLastDay.jackpot = res.data.jackpot
        }
        // this.dataForLastDay.jackpot = res.data.jackpot
        this.dataForLastDay.winners = res.data.winners
        this.amountToEth()
      })
    },
    getAddress(address) {
      if (this.$store.state.networkId === 1) {
        return `https://etherscan.io/address/${address}`
      } else if (this.$store.state.networkId === 42) {
        return `https://kovan.etherscan.io/address/${address}`
      } else {
        return `https://etherscan.io/address/${address}`
      }
    }
  },
  watch: {
    'dataForLastDay.wagers.amount'(val){
      this.eths.wagersAmount = parseFloat(val)
      this.runNumber()
    },
    'dataForLastDay.jackpot.amount'(val){
      this.eths.jackpotAmount = parseFloat(val)
      this.runNumber()
    }
  },
  destroyed() {
    clearInterval(this.timer)
  }
}
</script>

<style scoped lang="scss">
.index {
  h1 {
    font-size:21px;
    color:#d0d2d9;
    text-align: center;
    line-height: 1.5;
  }
  h2{
    margin-bottom: 30px;
    text-align: center;
    font-size:16px;
    color:#d0d2d9;
    a{
      color:#179efc;
      text-decoration: underline;
    }
  }
  .infor{
    display: flex;
    text-align: center;
    flex-grow:1;
    >li{
      flex:1;
      width:33.3%;
      background: #364353;
      border-radius: 5px;
      margin:0 20px;
      box-shadow: 0 0 25px rgba(28,35,45,.7);
      &:first-child{
        margin-left: 0;
      }
      &:last-child{
        margin-right: 0;
      }
      h3{
        color:rgba(255,255,255,.5);
        font-size:16px;
        line-height: 40px;
      }
      p{
        font-size: 26px;
        color:#fff;
        height: 55px;
        line-height: 55px;
        strong{
          font-size: 38px;
          font-weight: normal;
          margin-right: 10px;
        }
      }
      .tip{
        display: block;
        color:rgba(255,255,255,.5);
        font-size:18px;
        line-height:40px;
        a{
          color:#ffdf66;
          text-decoration: underline;
          display: inline-block;
          width: 68%;
          text-overflow: ellipsis;
          overflow: hidden;
          vertical-align: middle;
        }
      }
      .nodata{
        font-size:16px;
        color:#fff;
        margin-top: 25px;
      }
      ol{
        padding:0 5%;
        >li{
          text-align: left;
          margin-bottom: 10px;
          position: relative;
          padding-left: 34px;
          i{
            position: absolute;
            left:0;
            top:0;
            width:24px;
            height:24px;
            background: #d9c062;
            font-size:18px;
            color:#fff;
            text-align: center;
          }
          a{
            color:#fff;
            font-size:18px;
            float: left;
            width:60%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            &.same{
              color:#ffdf66;
            }
          }
          span{
            width:40%;
            float: right;
            text-align: right;
            color:#fff;
            font-size:14px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            strong{
              font-size:20px;
              font-weight: normal;
            }
          }
        }
      }
    }
  }
  .newBnr{
    position: relative;
    margin-top: 30px;
    img{
      width:100%;
    }
    p{
      position: absolute;
      left:0;
      right:0;
      top:0;
      bottom:0;
      display: flex;
      align-items: center;
      justify-content: center;
      span{
        font-size:24px;
        color:#fff;
        margin-right: 30px;
      }
      i{
        height:40px;
        line-height: 40px;
        color:#fff;
        background: #2c63f1;
        border-radius: 3px;
        vertical-align: middle;
        text-align:center;
        font-size:20px;
        border:1px solid #36adff;
        cursor: pointer;
      }
    }
  }
  .mine{
    margin-top: 30px;
    dl{
      padding:43px 15%;
      background: #364353;
      border-radius: 5px;
      box-shadow: 0 0 25px rgba(28,35,45,.7);
      dt{
        position: relative;
        font-size:24px;
        color:#fff;
        strong{
          font-weight: normal;
          color:#fff10e;
          margin-left: 30px;
          word-wrap: break-word;
          word-break: break-all;
        }
        .copy{
          position: absolute;
          color:#179efc;
          font-size:20px;
          right:0;
          top:6px;
          background: none;
          border:none;
          &:focus{
            outline:none;
          }
          img{
            vertical-align: middle;
          }
          s{
            text-decoration: underline;
            margin-left: 15px;
          }
        }
      }
      dd{
        margin-top: 10px;
        font-size:18px;
        color:rgba(255,255,255,.5);
        span{
          &:first-child{
            margin-right: 100px;
          }
          i{
            margin-left: 10px;
          }
        }
      }
    }
  }
  .games{
    padding:30px 0 0;
    display:flex;
    >li{
      flex:1;
      text-align:center;
      .ico{
        height:85px;
        align-items:center;
        display:flex;
        justify-content:center;
        margin-bottom: 10px;
        img{
          height:100%;
        }
      }
      dl{
        color:#fff;
        dt{
          font-size:26px;
          height: 80px;
          line-height: 1.1;
        }
        dd{
          font-size:16px;
          height:65px;
        }
      }
      .btn{
        position: relative;
        max-width:280px;
        margin: 0 auto;
        img{
          width:100%;
          vertical-align: top;
        }
        a{
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          left:0;
          top:0;
          width:100%;
          height:100%;
          background: url(~/assets/img/btn_1.png) no-repeat 0 0;
          background-size:100% auto;
          font-size:24px;
          color:#fff;
          transition: background 1s ease;
          box-shadow: 0 0 25px rgba(28,35,45,.7);
          &:hover{
            background: url(~/assets/img/btn_2.png) no-repeat 0 0;
            background-size:100% auto;
          }
        }
      }
    }
  }
  /deep/ .el-dialog{
    width:450px;
    background: #364353;
    color:#fff;
    .el-dialog__body{
      margin-top: -36px;
      color:#fff;
    }
  }
  .eldMain{
    h3{
      font-weight: bold;
      font-size:16px;
      margin-bottom: 15px;
    }
    .nameTxt{
      height:40px;
      line-height: 40px;
      border:1px solid #ddd;
      border-radius: 5px;
      margin-bottom: 15px;
      position: relative;
      color:#333;
      padding-left: 70px;
      span{
        position: absolute;
        left:0;
        top:0;
        width:70px;
        text-align: center;
        background: #eee;
        height:40px;
        border:none;
      }
      input{
        width:auto;
        text-align: center;
        height:40px;
        line-height:40px;
        width:100%;
        font-size:14px;
        &.errorRed{
          box-shadow: 0 0 3px red inset;
        }
      }
    }
    .btn{
      margin-top: 15px;
      span{
        display: block;
        text-align: center;
        max-width:450px;
        margin: 0 auto;
        background: url(~/assets/img/btn_1.png) no-repeat 0 0;
        background-size:100% auto;
        border:none;
      }
    }
  }
}
@media screen and (max-width: 1024px){
  .index{
    h2{
      margin-bottom: 30px;
    }
    .infor{
      padding:0;
      width:100%;
      >li{
        height:auto;
        margin: 0 10px;
        h3{
          font-size:14px;
          line-height: 30px;
        }
        p{
          font-size: 16px;
          height:auto;
          line-height: 40px;
          strong{
            font-size: 22px;
            margin-right: 0;
          }
        }
        .tip{
          font-size:14px;
          height:auto;
          line-height: 30px;
        }
        .nodata{
          margin-top: 18px;
        }
        ol{
          padding:0 10px;
          >li{
            margin-bottom: 5px;
            padding-left:30px;
            i{
              width:20px;
              height:20px;
              font-size:14px;
            }
            em{
              font-size:12px;
            }
            span{
              font-size:12px;
              strong{
                font-size:14px;
              }
            }
          }
        }
      }
    }
    .mine{
      margin-top: 30px;
      padding:0;
      dl{
        padding:30px 10%;
        margin: 0;
        dt{
          font-size: 18px;
          strong{
            margin-left: 10px;
          }
          .copy{
            font-size:14px;
            top:3px;
            s{
              margin-left: 10px;
            }
          }
        }
        dd{
          margin-top: 10px;
          font-size:14px;
          span{
            &:first-child{
              margin-right: 40px;
            }
            i{
              margin-left: 10px;
            }
          }
        }
      }
    }
    .games{
      padding:30px 0 0;
      flex-wrap: wrap;
      flex-direction:column;
      >li{
        position: relative;
        width:100%;
        border-bottom:1px solid rgba(255,255,255,.1);
        .ico{
          height:140px;
          margin-bottom:0;
          width:12%;
          img{
            width:100%;
            height:auto;
          }
        }
        dl{
          position: absolute;
          left:15%;
          top:0;
          width:55%;
          height: 100%;
          text-align:left;
          display: flex;
          justify-content:center;
          flex-direction:column;
          dt{
            width:100%;
            font-size:22px;
            height: auto;
            line-height: 1.1;
            margin-bottom: 10px;
          }
          dd{
            width:100%;
            font-size:14px;
            height: auto;
          }
        }
        .btn{
          position: absolute;
          right:0;
          top:50%;
          width:180px;
          margin-top: -25px;
          a{
            font-size:18px;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 800px) {
  .index{
    .games{
      >li{
        .ico{
          height:120px;
          width:15%;
        }
        dl{
          left:18%;
        }
      }
    }
    /deep/ .el-dialog{
      width:60%;
    }
  }
}
@media screen and (max-width: 550px){
  .index{
    .infor{
      flex-direction:column;
      >li{
        margin:0 0 10px;
        width:100%;
        .nodata{
          margin-top: 10px;
          padding-bottom: 20px;
        }
        ol{
          li{
            a{
              font-size:14px;
            }
          }
        }
      }
    }
    .newBnr{
      margin-top: 10px;
      overflow: hidden;
      border-radius: 8px;
      img{
        width:auto;
        height:80px;
      }
      p{
        padding:0 15px 0 25px;
        span{
          font-size:14px;
          margin-right:5px;
        }
        i{
          width:90px;
          height:30px;
          line-height: 30px;
          font-size:14px;
        }
      }
    }
    .mine{
      margin-top:0;
      dl{
        padding:15px 10%;
        dt{
          strong{
            margin-top: 5px;
            display: block;
            margin-left:0;
            font-size:14px;
          }
          .copy{
            font-size:14px;
            top:3px;
            s{
              margin-left: 10px;
            }
          }
        }
        dd{
          margin-top: 10px;
          font-size:14px;
          span{
            &:first-child{
              margin-right: 40px;
            }
            i{
              margin-left: 10px;
            }
          }
        }
      }
    }
    .games{
      >li{
        dl{
          dt{
            font-size:18px;
          }
          dd{
            font-size:13px;
          }
        }
        .btn{
          width:90px;
          margin-top: 0;
          top:40px;
          a{
            width:90px;
            height:40px;
            font-size:12px;
            border-radius: 5px;
            background-position: center top;
            background-size:auto 40px;
            box-sizing: border-box;
          }
        }
      }
    }
    /deep/ .el-dialog{
      width:90%;
    }
  }
}

</style>
