<template>
  <div class="history">
      <h3>{{ $t('history.title') }}</h3>
      <span class="onlyme" :class="{active:isShowMe}" @click="showMe">{{ $t('history.me') }}</span>
      <div class="listBox" v-loading="loading">
          <header>
              <span>{{ $t('history.tt01') }}</span>
              <span>{{ $t('history.tt02') }}</span>
              <span>{{ $t('history.tt03') }}</span>
              <span>{{ $t('history.tt04') }}</span>
          </header>
          <div class="listScroll" id="allHistory" v-if="!isShowMe">
            <el-collapse v-model="activeName" accordion v-if="historyData.records && historyData.records.length>0">
                <el-collapse-item :name="item.txHash" v-for="(item,index) in historyData.records" :key="index">
                    <template slot="title">
                        <span class="address" :class="[isTopWinner(item.address) ? 'same' : '']">{{item.address}}</span>
                        <span class="bet">
                          {{parseFloat(item.amount).toFixed(2)}}
                          <i class="game1" v-show="gameId == '1'">
                            <img src="~/assets/img/ico_coin1_1.png" v-if="item.betMask=='1'" alt="">
                            <img src="~/assets/img/ico_coin2_1.png" v-else alt="">
                          </i>
                          <i class="game2" v-show="gameId == '2'">
                            <img src="~/assets/img/dice1_1.png" v-show="item.betMask.indexOf('1') > -1" alt="">
                            <img src="~/assets/img/dice2_1.png" v-show="item.betMask.indexOf('2') > -1" alt="">
                            <img src="~/assets/img/dice3_1.png" v-show="item.betMask.indexOf('3') > -1" alt="">
                            <img src="~/assets/img/dice4_1.png" v-show="item.betMask.indexOf('4') > -1" alt="">
                            <img src="~/assets/img/dice5_1.png" v-show="item.betMask.indexOf('5') > -1" alt="">
                            <img src="~/assets/img/dice6_1.png" v-show="item.betMask.indexOf('6') > -1" alt="">
                          </i>
                          <i class="game3" v-show="gameId == '3'">{{item.betMask}}</i>
                          <i class="game4" v-show="gameId == '4'">≤ {{item.betMask}}</i>
                        </span>
                        <span class="result">
                          <i class="game1" v-show="gameId == '1'" :class="[item.gameMask==item.betMask ? 'same' : '']">
                            <img src="~/assets/img/ico_coin1_1.png" v-if="item.gameMask=='1'" alt="">
                            <img src="~/assets/img/ico_coin2_1.png" v-else alt="">
                          </i>
                          <i class="game2" v-show="gameId == '2'" :class="[item.betMask.indexOf(item.gameMask) > -1 ? 'same' : '']">
                            <img src="~/assets/img/dice1_1.png" v-show="item.gameMask == '1'" alt="">
                            <img src="~/assets/img/dice2_1.png" v-show="item.gameMask == '2'" alt="">
                            <img src="~/assets/img/dice3_1.png" v-show="item.gameMask == '3'" alt="">
                            <img src="~/assets/img/dice4_1.png" v-show="item.gameMask == '4'" alt="">
                            <img src="~/assets/img/dice5_1.png" v-show="item.gameMask == '5'" alt="">
                            <img src="~/assets/img/dice6_1.png" v-show="item.gameMask == '6'" alt="">
                          </i>
                          <i class="game3" v-show="gameId == '3'" :class="[game3_result(item.betMask,item.gameMask) ? 'same' : '']">
                            <s class="img_dice2" v-for="(item,index) in item.gameMask.split(',')" :key="index" :class="'dice2_'+item"></s>
                          </i>
                          <i class="game4" v-show="gameId == '4'" :class="[parseInt(item.gameMask) <= parseInt(item.betMask) ? 'same' : '']">{{item.gameMask}}</i>
                          {{item.getamount == '0' ? '--' : parseInt(parseFloat(item.getamount)*1000)/1000}}
                        </span>
                        <span class="award">{{item.amount >= 0.1 ? item.jackpotMask : '--'}}</span>
                    </template>
                    <div class="detail"><em>{{ $t('history.dcont01') }}</em><span><a :href="getAddress(item.address)" target="_blank">{{item.address}}</a></span></div>
                    <div class="detail"><em>{{ $t('history.dcont02') }}</em><span>{{parseFloat(item.amount).toFixed(2)}}{{ $t('eth') }}</span></div>
                    <div class="detail"><em>{{ $t('history.dcont03') }}</em><span>{{item.betMaskShow}}</span></div>
                    <div class="detail"><em>bet trx</em><span><a :href="getTxHash(item.txHash)" target="_blank">{{item.txHash}}</a></span></div>
                    <div class="detail"><em>sha3(secret)</em><span>{{item.commit}}</span></div>
                    <div class="detail"><em>secret</em><span>{{item.reveal}}</span></div>
                    <div class="detail"><em>sha3(bet block)</em><span>{{item.betBlockHash}}</span></div>
                    <div class="detail"><em>sha3(blk + secret)</em><span>{{item.blkSecret}}</span></div>
                    <div class="detail"><em>sha3 mod {{modulo}}</em><span>{{item.gameMaskShow}}</span></div>
                    <div class="detail" v-if="item.jackpotMask != '0'"><em>jackpot</em><span>{{item.jackpotMask}}</span></div>
                    <div class="detail"><em>{{ $t('history.dcont04') }}</em><span>{{parseInt(parseFloat(item.getamount)*1000)/1000}}{{ $t('eth') }}</span></div>
                </el-collapse-item>
            </el-collapse>
            <div class="nodata" v-else>{{ $t('nodata') }}</div>
          </div>
          <div class="listScroll" id="myHistory" v-else>
            <el-collapse v-model="activeName" accordion v-if="meData.records && meData.records.length>0">
                <el-collapse-item :name="item.txHash" v-for="(item,index) in meData.records" :key="index">
                    <template slot="title">
                        <span class="address" :class="[isTopWinner(item.address) ? 'same' : '']">{{item.address}}</span>
                        <span class="bet">
                          {{parseFloat(item.amount).toFixed(2)}}
                          <i class="game1" v-show="gameId == '1'">
                            <img src="~/assets/img/ico_coin1_1.png" v-if="item.betMask=='1'" alt="">
                            <img src="~/assets/img/ico_coin2_1.png" v-else alt="">
                          </i>
                          <i class="game2" v-show="gameId == '2'">
                            <img src="~/assets/img/dice1_1.png" v-show="item.betMask.indexOf('1') > -1" alt="">
                            <img src="~/assets/img/dice2_1.png" v-show="item.betMask.indexOf('2') > -1" alt="">
                            <img src="~/assets/img/dice3_1.png" v-show="item.betMask.indexOf('3') > -1" alt="">
                            <img src="~/assets/img/dice4_1.png" v-show="item.betMask.indexOf('4') > -1" alt="">
                            <img src="~/assets/img/dice5_1.png" v-show="item.betMask.indexOf('5') > -1" alt="">
                            <img src="~/assets/img/dice6_1.png" v-show="item.betMask.indexOf('6') > -1" alt="">
                          </i>
                          <i class="game3" v-show="gameId == '3'">{{item.betMask}}</i>
                          <i class="game4" v-show="gameId == '4'">≤ {{item.betMask}}</i>
                        </span>
                        <span class="result">
                          <i class="game1" v-show="gameId == '1'" :class="[item.gameMask==item.betMask ? 'same' : '']">
                            <img src="~/assets/img/ico_coin1_1.png" v-if="item.gameMask=='1'" alt="">
                            <img src="~/assets/img/ico_coin2_1.png" v-else alt="">
                          </i>
                          <i class="game2" v-show="gameId == '2'" :class="[item.betMask.indexOf(item.gameMask) > -1 ? 'same' : '']">
                            <img src="~/assets/img/dice1_1.png" v-show="item.gameMask == '1'" alt="">
                            <img src="~/assets/img/dice2_1.png" v-show="item.gameMask == '2'" alt="">
                            <img src="~/assets/img/dice3_1.png" v-show="item.gameMask == '3'" alt="">
                            <img src="~/assets/img/dice4_1.png" v-show="item.gameMask == '4'" alt="">
                            <img src="~/assets/img/dice5_1.png" v-show="item.gameMask == '5'" alt="">
                            <img src="~/assets/img/dice6_1.png" v-show="item.gameMask == '6'" alt="">
                          </i>
                          <i class="game3" v-show="gameId == '3'" :class="[game3_result(item.betMask,item.gameMask) ? 'same' : '']">
                            <s class="img_dice2" v-for="(item,index) in item.gameMask.split(',')" :key="index" :class="'dice2_'+item"></s>
                          </i>
                          <i class="game4" v-show="gameId == '4'" :class="[parseInt(item.gameMask) <= parseInt(item.betMask) ? 'same' : '']">{{item.gameMask}}</i>
                          {{item.getamount == '0' ? '--' : parseFloat(item.getamount).toFixed(2)}}
                        </span>
                        <span class="award">{{item.amount >= 0.1 ? item.jackpotMask : '--'}}</span>
                    </template>
                    <div class="detail"><em>{{ $t('history.dcont01') }}</em><span><a :href="getAddress(item.address)" target="_blank">{{item.address}}</a></span></div>
                    <div class="detail"><em>{{ $t('history.dcont02') }}</em><span>{{parseFloat(item.amount).toFixed(2)}}{{ $t('eth') }}</span></div>
                    <div class="detail"><em>{{ $t('history.dcont03') }}</em><span>{{item.betMaskShow}}</span></div>
                    <div class="detail"><em>bet trx</em><span><a :href="getTxHash(item.txHash)" target="_blank">{{item.txHash}}</a></span></div>
                    <div class="detail"><em>sha3(secret)</em><span>{{item.commit}}</span></div>
                    <div class="detail"><em>secret</em><span>{{item.reveal}}</span></div>
                    <div class="detail"><em>sha3(bet block)</em><span>{{item.betBlockHash}}</span></div>
                    <div class="detail"><em>sha3(blk + secret)</em><span>{{item.blkSecret}}</span></div>
                    <div class="detail"><em>sha3 mod {{modulo}}</em><span>{{item.gameMaskShow}}</span></div>
                    <div class="detail" v-if="item.jackpotMask != '0'"><em>jackpot</em><span>{{item.jackpotMask}}</span></div>
                    <div class="detail"><em>{{ $t('history.dcont04') }}</em><span>{{parseInt(parseFloat(item.getamount)*1000)/1000}}{{ $t('eth') }}</span></div>
                </el-collapse-item>
            </el-collapse>
            <div class="nodata" v-else>{{ $t('nodata') }}</div>
          </div>
      </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import { mapState } from 'vuex'
import { getmodulo } from '~/plugins/utils'

export default {
  data() {
    return {
      activeName: '',
      historyData:{},
      meData:{},
      isShowMe:false,
      loading:true,
      timer:null,
      topWinners:[]
    };
  },
  props:{
    gameId:String
  },
  computed:{
    modulo() {
      return getmodulo(this.gameId)
    }
  },
  mounted() {
    this.getHistory()
    // get history data
    this.timer = setInterval(() => {
      this.getHistory()
    },5000)
  },
  methods: {
    async getWinner() {
      let res_24h = await axios.get('/v1/24h')
      if (res_24h.data) {
        this.topWinners = res_24h.data.winners
      }
    },
    // curTxHash(num) {
    //   let val = ''
    //   if (this.isShowMe) {
    //     val = this.meData.records[num].txHash
    //   } else {
    //     val = this.historyData.records[num].txHash
    //   }
    //   return val
    // },
    async getHistory() {
      this.getWinner()
      let address
      if (this.isShowMe) {
        if (this.$web3.currentProvider.isMetaMask && this.$store.state.address) {
          address = this.$store.state.address
        } else {
          this.meData = ''
          this.loading = false
          return
        }
      } else {
        address = ''
      }
      let res_history = await axios.get('/v1/history',{
        params : {
          gameId : parseInt(this.gameId),
          address: address
        }
      })
      res_history.data.records.map((item) => {
        item.amount = this.$web3.utils.fromWei(item.amount)
        // item.jackpotMask = this.$web3.utils.fromWei(item.jackpotMask)
        item.betMaskShow = this.getMask(item.betMask)
        item.gameMaskShow = this.getMask(item.gameMask)
        item.blkSecret = this.$web3.utils.soliditySha3(item.betBlockNumber, item.commit)
        item.getamount = this.$web3.utils.fromWei((parseInt(item.dicePayment)+parseInt(item.jackpotPayment)).toString())
      })
      if (this.isShowMe) {
        if (this.$web3.currentProvider.isMetaMask) {
          // let openTxHash = ''
          // if (this.activeName !== '') {
          //   openTxHash = this.curTxHash(this.activeName)
          // }
          this.meData = res_history.data
          // if (openTxHash) {
          //   this.meData.records.map((item,index) => {
          //     if (item.txHash == openTxHash) {
          //       this.activeName = index
          //     }
          //   })
          // }
        } else {
          this.meData = {}
        }
      } else {
        // let openTxHash = ''
        // if (this.activeName !== '') {
        //   openTxHash = this.curTxHash(this.activeName)
        // }
        this.historyData = res_history.data
        // if (openTxHash) {
        //   this.historyData.records.map((item,index) => {
        //     if (item.txHash == openTxHash) {
        //       this.activeName = index
        //     }
        //   })
        // }
      }
      this.loading = false
    },
    isTopWinner(address){
      let addArr = this.topWinners.filter((item)=>{
        return item.address==address
      })
      return addArr.length > 0
    },
    showMe(){
      this.loading = true
      this.isShowMe = !this.isShowMe
      this.meData = {}
      this.historyData = {}
      this.activeName = ''
      this.getHistory()
    },
    getMask(val){
      let returnVal
      if (this.gameId == '1') {
        returnVal = val == '1' ? 'heads' : 'tails'
      } else {
        returnVal = val
      }
      return returnVal
    },
    getAddress(address) {
      if (this.$store.state.networkId === 1) {
        return `https://etherscan.io/address/${address}`
      } else if (this.$store.state.networkId === 42) {
        return `https://kovan.etherscan.io/address/${address}`
      } else {
        return ''
      }
    },
    getTxHash(trx) {
      if (this.$store.state.networkId === 1) {
        return `https://etherscan.io/tx/${trx}`
      } else if (this.$store.state.networkId === 42) {
        return `https://kovan.etherscan.io/tx/${trx}`
      } else {
        return `https://etherscan.io/tx/${trx}`
      }
    },
    game3_result(betMask,gameMask) {
      let gameMaskArr = gameMask.split(',')
      let sum = 0
      gameMaskArr.map((item) =>{
        sum = sum + parseInt(item)
      })
      let result = betMask.indexOf(sum) > -1
      return result
    }
  },
  destroyed() {
    clearInterval(this.timer)
  }
};
</script>
<style scoped lang="scss">
.history {
  width: 100%;
  background: rgba(64, 80, 99, 0.6);
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 16px;
  height: 680px;
  padding: 0 35px;
  box-shadow: 0 0 25px rgba(28, 35, 45, 0.7);
  position: relative;
  color: #fff;
  .img_dice2{
    background-repeat: no-repeat;
    background-size: 100% auto;
    &.dice2_1{
      background-image: url(~/assets/img/dice1_1.png);
    }
    &.dice2_2{
      background-image: url(~/assets/img/dice2_1.png);
    }
    &.dice2_3{
      background-image: url(~/assets/img/dice3_1.png);
    }
    &.dice2_4{
      background-image: url(~/assets/img/dice4_1.png);
    }
    &.dice2_5{
      background-image: url(~/assets/img/dice5_1.png);
    }
    &.dice2_6{
      background-image: url(~/assets/img/dice6_1.png);
    }
  }
  h3 {
    font-size: 22px;
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #515962;
  }
  .onlyme {
    position: absolute;
    right: 35px;
    top: 15px;
    font-size: 16px;
    text-decoration: underline;
    cursor: pointer;
    padding:5px 10px;
    border-radius: 5px;
    &.active{
      background: #202832;
    }
  }
  .listBox {
    color: rgba(255, 255, 255, 0.7);
    header {
      // padding-top: 6px;
      height: 50px;
      line-height: 50px;
      display: flex;
      border-bottom: 1px solid #515962;
      span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        &:nth-child(1) {
          width: 28%;
        }
        &:nth-child(2) {
          width: 30%;
        }
        &:nth-child(3) {
          width: 24%;
        }
        &:nth-child(4) {
          width: 18%;
        }
      }
    }
    .listScroll {
      height: 550px;
      overflow-y: auto;
      overflow-x: hidden;
      &::-webkit-scrollbar{
        width: 5px;
        height: 5px;
        border-radius: 5px;
        background-color: #202832;
      }
      &::-webkit-scrollbar-thumb{
        border-radius: 5px;
        background-color: #f8f8f8;
      }
      .nodata{
        text-align:center;
        padding-top: 150px;
        color:rgba(255, 255, 255, 0.5);
      }
      /deep/ .el-collapse {
        border-top: none;
        border-bottom: none;
        padding: 5px 0;
        .el-collapse-item__header {
          position: relative;
          background: transparent;
          color: rgba(255, 255, 255, 0.7);
          height: 31px;
          line-height: 31px;
          font-size: 12px;
          border-bottom: none;
          .el-collapse-item__arrow {
            position: absolute;
            float: none;
            right: 0;
            top: 0;
            font-size: 16px;
            font-weight: bold;
            line-height: 31px;
          }
          span {
            float: left;
            box-sizing: border-box;
            padding-right: 2%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            &.address {
              width: 28%;
              &.same{
                color:#ffdf66;
              }
            }
            &.bet {
              width: 30%;
            }
            &.result {
              width: 24%;
              i{
                &.game2{
                  img{
                    width:20px;
                    vertical-align: -6px;
                  }
                }
                &.game3{
                  s{
                    display: inline-block;
                    width:12px;
                    height:12px;
                    margin-right:2px;
                    vertical-align: -2px;
                    position: relative;
                  }
                  &.same{
                    s{
                      &:after{
                        content:'';
                        position: absolute;
                        top:0;
                        left:0;
                        width:100%;
                        height:100%;
                        background-color: rgba(81, 234, 85, 0.5);
                      }

                    }
                  }
                }
                &.game4{
                  color:#fff;
                  font-weight: bold;
                  &.same{
                    color:rgba(81, 234, 85, .5);
                  }
                }
              }
            }
            i{
              display: inline-block;
              &.same{
                position: relative;
                &:after{
                  content:'';
                  position: absolute;
                  left:0;
                  background: rgba(127, 255, 127, 0.5);
                }
              }
              &.game1{
                img {
                  width: 24px;
                  vertical-align: -8px;
                }
                &.same:after{
                  width:24px;
                  height:24px;
                  top:6px;
                  border-radius: 100%;
                }
              }
              &.game2{
                img {
                  width: 12px;
                  margin-right: 2px;
                  vertical-align: -2px;
                }
                &.same:after{
                  width:20px;
                  height:20px;
                  top:6px;
                }
              }
              &.game3,&.game4{
                color:#aeaeae;
              }
            }
          }
        }
        .el-collapse-item__wrap {
          background: transparent;
          border-bottom: none;
          background: #212935;
          padding: 15px;
          will-change: auto;
          .el-collapse-item__content {
            font-size:12px;
            padding: 0;
            color: rgba(255, 255, 255, 0.7);
          }
        }
      }
      .detail{
        em{
          display: inline-block;
          width:35%;
          line-height: 20px;
          vertical-align: middle;
          letter-spacing: 0;
        }
        span{
          line-height: 20px;
          vertical-align: middle;
          display: inline-block;
          width:65%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        a{
          color:rgba(255, 255, 255, .7)
        }
      }
    }
  }
  /deep/ .el-loading-mask{
    background: rgb(53,67,83);
    .el-loading-spinner{
      .circular{
        width:52px;
        height:52px;
      }
      .path{
        stroke:#fff;
      }
    }
  }
}
@media screen and (max-width: 500px) {
  .history {
    padding: 0;
    font-size:14px;
    background: none;
    box-shadow: none;
    height: auto;
    h3 {
      font-size: 18px;
      height: 50px;
      line-height: 50px;
    }
    .onlyme {
      right: 0;
      top: 15px;
      font-size: 14px;
    }
    .listBox {
      color: rgba(255, 255, 255, 0.7);
      header {
        padding-top: 3px;
        height: 40px;
        line-height: 40px;
        span {
          &:nth-child(1) {
            width: 25%;
          }
          &:nth-child(2) {
            width: 38%;
          }
          &:nth-child(3) {
            width: 37%;
          }
          &:nth-child(4) {
            display:none;
          }
        }
      }
      .listScroll {
        height:500px;
        &::-webkit-scrollbar{
          width: 3px;
          height: 3px;
          border-radius: 3px;
          background-color: #202832;
        }
        &::-webkit-scrollbar-thumb{
          border-radius: 3px;
          background-color: #f8f8f8;
        }
        /deep/ .el-collapse {
          .el-collapse-item__header {
            height: 31px;
            line-height: 31px;
            font-size: 13px;
            .el-collapse-item__arrow {
              right: 0;
              top: 0;
              font-size: 12px;
            }
            span {
              padding-right: 2%;
              &.address {
                width: 25%;
              }
              &.bet {
                width: 38%;
              }
              &.result {
                width: 37%;
                i{
                  &.game2{
                    img{
                      width:20px;
                      vertical-align: -4px;
                    }
                  }
                }
              }
              &.award {
                display: none;
              }
              i{
                &.game2{
                  img {
                    width: 10px;
                  }
                  &.same:after{
                    width:20px;
                    height:20px;
                    top:5px;
                  }
                }
              }
            }
          }
          .el-collapse-item__wrap {
            background: rgba(64, 80, 99, 0.6);
            padding: 10px 15px;
          }
        }
      }
    }
  }
}
</style>
