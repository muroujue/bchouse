<template>
  <div class="autoplay">
    <div class="input-suffix hasinfo">
      <p class="info">温馨提醒：本网站永远不会保存或上传您的私钥信息，如果刷新本网页，私钥将会被自动删除，请您放心！</p>
      <span>属性方式：</span>
      <el-input class="pkey" v-model="privateKey" v-if="!isMask"></el-input>
      <el-input class="pkey" v-model="privateStarKey" readonly v-else></el-input>
      <el-checkbox label="Mask" name="type" v-model="isMask"></el-checkbox>
    </div>
    <div class="input-suffix">
      <span>每轮最多投注X局：</span>
      X = <el-select class="num" v-model="betNum">
        <el-option v-for="item in betNumOptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>，如果赢了则开启新一轮
    </div>
    <div class="input-suffix">
      <span>选择一个游戏：</span>
      <el-select class="el-select-long" v-model="gameID" placeholder="请选择">
        <el-option v-for="item in gamesOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="input-suffix">
      <span>下注策略：</span>
      <el-select class="el-select-long" v-model="strategyID" placeholder="请选择">
        <el-option v-for="item in strategyOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="input-suffix" v-if="strategyID != 0">
      <span>第一局投注金额：</span>
      <el-select class="el-select-long" v-model="amountVal" placeholder="请选择">
        <el-option v-for="item in amountOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <s v-if="amountVal === 0"><el-input class="amount" v-model="amountInput"></el-input> ETH</s>
    </div>
    <div class="tableShow" v-if="gameID && betNum > 0">
      <table>
        <thead>
          <tr>
            <th class="sort_col"><div class="cell">第 X 局</div></th>
            <th class="bet_col"><div class="cell">押注</div></th>
            <th class="amount_col"><div class="cell">金额(ETH)</div></th>
            <th class="tip_col"><div class="cell">提示</div></th>
          </tr>
        </thead>
        <tbody v-if="gameID === 1">
          <tr v-for="(item,index) in betNum" :key="index">
            <td><div class="cell">{{item}}</div></td>
            <td>
              <div class="cell">
                <el-radio :disabled="strategyID != 0" v-model="betArr1[index].betMask" :label="1"><img src="~/assets/img/ico_coin1_3.png" alt=""></el-radio>
                <el-radio :disabled="strategyID != 0" v-model="betArr1[index].betMask" :label="2"><img src="~/assets/img/ico_coin2_3.png" alt=""></el-radio>
              </div>
            </td>
            <td>
              <div class="cell">
                <el-input :disabled="strategyID != 0" v-model="betArr1[index].betValue"></el-input>
              </div>
            </td>
            <td>
              <div class="cell">获胜概率：{{betArr1[index].odds}}%，您将赢得 {{betArr1[index].winAmount}} ETH</div>
            </td>
          </tr>
        </tbody>
        <tbody v-else-if="gameID === 2">
           <tr v-for="(item,index) in betNum" :key="index">
            <td><div class="cell">{{item}}</div></td>
            <td>
              <div class="cell">
                <el-checkbox-group v-model="betArr2[index].betMask" @change="checkBetMask(2,betArr2[index].betMask)">
                  <el-checkbox :disabled="strategyID != 0" :label="1"><img src="~/assets/img/dice1_3.png" alt=""></el-checkbox>
                  <el-checkbox :disabled="strategyID != 0" :label="2"><img src="~/assets/img/dice2_3.png" alt=""></el-checkbox>
                  <el-checkbox :disabled="strategyID != 0" :label="3"><img src="~/assets/img/dice3_3.png" alt=""></el-checkbox>
                  <el-checkbox :disabled="strategyID != 0" :label="4"><img src="~/assets/img/dice4_3.png" alt=""></el-checkbox>
                  <el-checkbox :disabled="strategyID != 0" :label="5"><img src="~/assets/img/dice5_3.png" alt=""></el-checkbox>
                  <el-checkbox :disabled="strategyID != 0" :label="6"><img src="~/assets/img/dice6_3.png" alt=""></el-checkbox>
                </el-checkbox-group>
              </div>
            </td>
            <td>
              <div class="cell">
                <el-input v-model="betArr2[index].betValue"></el-input>
              </div>
            </td>
            <td>
              <div class="cell">获胜概率：{{betArr2[index].odds}}%，您将赢得 {{betArr2[index].winAmount}} ETH</div>
            </td>
          </tr>
        </tbody>
        <tbody v-else-if="gameID === 3">
           <tr v-for="(item,index) in betNum" :key="index">
            <td><div class="cell">{{item}}</div></td>
            <td>
              <div class="cell">
                <el-checkbox-group v-model="betArr3[index].betMask" @change="checkBetMask(3,betArr3[index].betMask)">
                  <el-checkbox :disabled="strategyID != 0" :label="2">2</el-checkbox>
                  <el-checkbox :disabled="strategyID != 0" :label="3">3</el-checkbox>
                  <el-checkbox :disabled="strategyID != 0" :label="4">4</el-checkbox>
                  <el-checkbox :disabled="strategyID != 0" :label="5">5</el-checkbox>
                  <el-checkbox :disabled="strategyID != 0" :label="6">6</el-checkbox>
                  <el-checkbox :disabled="strategyID != 0" :label="7">7</el-checkbox>
                  <el-checkbox :disabled="strategyID != 0" :label="8">8</el-checkbox>
                  <el-checkbox :disabled="strategyID != 0" :label="9">9</el-checkbox>
                  <el-checkbox :disabled="strategyID != 0" :label="10">10</el-checkbox>
                  <el-checkbox :disabled="strategyID != 0" :label="11">11</el-checkbox>
                  <el-checkbox :disabled="strategyID != 0" :label="12">12</el-checkbox>
                </el-checkbox-group>
              </div>
            </td>
            <td>
              <div class="cell">
                <el-input v-model="betArr3[index].betValue"></el-input>
              </div>
            </td>
            <td>
              <div class="cell">获胜概率：{{betArr3[index].odds}}%，您将赢得 {{betArr3[index].winAmount}} ETH</div>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
           <tr v-for="(item,index) in betNum" :key="index">
            <td><div class="cell">{{item}}</div></td>
            <td>
              <div class="cell">
                <el-input :disabled="strategyID != 0" type="tel" v-model="betArr4[index].betMask" style="width:100px" maxlength="2" max="97" min="1"></el-input>
              </div>
            </td>
            <td>
              <div class="cell">
                <el-input v-model="betArr4[index].betValue"></el-input>
              </div>
            </td>
            <td>
              <div class="cell">获胜概率：{{betArr4[index].odds}}%，您将赢得 {{betArr4[index].winAmount}} ETH</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="input-suffix">
      <span>终止条件：</span>
      利润 >= <el-input v-model="endMaxValue" class="profit"></el-input> ETH
      或者
      利润 ≤ <el-input v-model="endMinValue" class="profit"></el-input> ETH
    </div>
    <div class="input-suffix">
      <el-button class="startBtn" :type="btnType" v-if="!starting" @click="gameStart">开始执行</el-button>
      <el-button class="startBtn" :type="btnType" v-else @click="gameEnd">终止执行</el-button>
      <!--  -->
    </div>
    <div class="bottomInfo">
      <div class="biCol">
        <p>正在执行第1轮1局...</p>
        <p><span>押注：</span>[正面数字],获胜概率50%,1.98x, 预计赢得 0.019 ETH</p>
        <p><span>金额：</span>0.123 ETH</p>
        <p><span>过程：</span>已提交...   已确认... 等待开奖...</p>
        <p><span>结果：</span>[正面数字],中奖，赢得 0.019 ETH</p>
      </div>
      <div class="biCol">
        <p><span>地址：</span>0xc81da1f8dff4303fdd4c53bab2d1c919b2bdfbb1</p>
        <p><span>初始余额：</span>0.123 ETH</p>
        <p><span>当前余额：</span>0.2 ETH</p>
        <p><span>利润：</span>0.2 ETH</p>
      </div>
    </div>
  </div>
</template>

<script>
import contractAddress from '~/settings/contractAddress.js'
import { game1_betArr,game2_betArr,game3_betArr,game4_betArr } from '~/settings/robot'
import { winRatio,getmodulo } from '~/plugins/utils'
import abi from '~/settings/fairhouse_sol_FairHouse'
import axios from '~/plugins/axios'
import toMask from '~/settings/display_to_mask.json'
import BigNumber from 'bignumber.js'
export default {
  data() {
    return {
      privateKey:'',
      isMask:false,
      betNum:null,
      gameID:'',
      strategyID:0,
      amountInput:0.01,
      endMaxValue:'',
      endMinValue:'',
      betNumOptions:[1,2,3,4,5,6,7,8,9,10],
      commitLastBlock:null,
      commit:null,
      r:null,
      s:null,
      gasPrice:null,
      gamesOptions:[
        {
          label:'Coin flip',
          value:1
        },
        {
          label:'Dice',
          value:2
        },
        {
          label:'Two dice',
          value:3
        },
        {
          label:'Etheroll',
          value:4
        }
      ],
      strategyOption1:[
        {
          label:'自定义策略',
          value:0
        },
        {
          label:'随机选择1个，输了金额翻倍',
          value:1
        }
      ],
      strategyOption2:[
        {
          label:'自定义策略',
          value:0
        },
        {
          label:'随机选择1个，输了金额翻倍',
          value:1
        },
        {
          label:'随机选择2个，输了金额翻倍',
          value:2
        },
        {
          label:'随机选择3个，输了金额翻倍',
          value:3
        },
        {
          label:'随机选择4个，输了金额翻倍',
          value:4
        },
        {
          label:'随机选择5个，输了金额翻倍',
          value:5
        }
      ],
      strategyOption3:[
        {
          label:'自定义策略',
          value:0
        },
        {
          label:'随机选择1个，输了金额翻倍',
          value:1
        },
        {
          label:'随机选择2个，输了金额翻倍',
          value:2
        },
        {
          label:'随机选择3个，输了金额翻倍',
          value:3
        },
        {
          label:'随机选择4个，输了金额翻倍',
          value:4
        },
        {
          label:'随机选择5个，输了金额翻倍',
          value:5
        },
        {
          label:'随机选择6个，输了金额翻倍',
          value:6
        },
        {
          label:'随机选择7个，输了金额翻倍',
          value:7
        },
        {
          label:'随机选择8个，输了金额翻倍',
          value:8
        },
        {
          label:'随机选择9个，输了金额翻倍',
          value:9
        },
        {
          label:'随机选择5个，输了金额翻倍',
          value:10
        }
      ],
      strategyOption4:[
        {
          label:'自定义策略',
          value:0
        }
      ],
      amountVal:0,
      amountOptions:[
        {
          label:'自定义金额',
          value:0
        },
        {
          label:'0.01',
          value:0.01
        },
        {
          label:'0.02',
          value:0.02
        },
        {
          label:'0.03',
          value:0.03
        },
        {
          label:'0.04',
          value:0.04
        },
        {
          label:'0.05',
          value:0.05
        },
        {
          label:'0.1',
          value:0.1
        },
        {
          label:'0.2',
          value:0.2
        },
        {
          label:'0.3',
          value:0.3
        },
        {
          label:'0.4',
          value:0.4
        },
        {
          label:'0.5',
          value:0.5
        },
        {
          label:'1',
          value:1
        },
        {
          label:'2',
          value:2
        },
        {
          label:'3',
          value:3
        },
        {
          label:'4',
          value:4
        },
        {
          label:'5',
          value:5
        }
      ],
      starting:false,
      betArr1:JSON.parse(game1_betArr),
      betArr2:JSON.parse(game2_betArr),
      betArr3:JSON.parse(game3_betArr),
      betArr4:JSON.parse(game4_betArr)
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
  layout:'admin',
  computed:{
    modulo() {
      return getmodulo(this.gameID.toString())
    },
    btnType() {
      return this.starting ? 'danger' : 'primary'
    },
    privateStarKey() {
      let frontKey = this.privateKey.substr(0,8)
      let endKey = this.privateKey.substr(this.privateKey.length-8)
      console.log(endKey)
      let stars = new Array(this.privateKey.length-15).join('*')
      return frontKey + stars + endKey
    },
    strategyOptions() {
      let val
      if (this.gameID === 1) {
        val = this.strategyOption1
      } else if (this.gameID === 2) {
        val = this.strategyOption2
      } else if (this.gameID === 3) {
        val = this.strategyOption3
      } else {
        val = this.strategyOption4
      }
      return val
    },
    betAmount() {
      let val
      if (this.amountVal === 0) {
        val = this.amountInput
      } else {
        val = this.amountVal
      }
      return val
    }
  },
  mounted() {
    this.getWeb3()
    setTimeout(()=>{
        this.getWeb3()
    },1000)
  },
  watch: {
    strategyID (val) {
      if (val != 0) {
        this.randomStrategy(val)
      }
    },
    gameID (val) {
      if (this.strategyID != 0) {
        this.randomStrategy(this.strategyID)
      }
    },
    betNum (val) {
      if (this.strategyID != 0) {
        this.randomStrategy(this.strategyID)
      }
    },
    betAmount(val) {
      if (this.strategyID != 0) {
        this.randomStrategy(this.strategyID)
      }
    }
  },
  methods:{
    getWeb3() {
      if (this.$web3.currentProvider.isMetaMask) {
        this.metaMaskLogin = true
        this.$web3.eth.getAccounts().then((data) => {
          if (data.length > 0) {
            // this.metaMaskShow = false
            this.$store.commit('setAddress', data[0].toLowerCase())
          } else {
            // this.metaMaskShow = true
            this.$store.commit('setAddress', null)
          }
        })
        this.$web3.eth.net.getId().then((data) => {
          this.$store.commit('setNetworkId', data)
        })
      } else {
        // this.metaMaskShow = true
        this.metaMaskLogin = false
        this.$store.commit('setAddress', null)
        this.$store.commit('setNetworkId', null)
      }
    },
    arraySort(arr){
      return arr.sort((a,b) => {
        return a-b
      })
    },
    getRandomArray(arr, count) {
      let shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index
      while (i-- > min) {
        index = Math.floor((i + 1) * Math.random())
        temp = shuffled[index]
        shuffled[index] = shuffled[i]
        shuffled[i] = temp
      }
      return shuffled.slice(min)
    },
    getWinAmountBN(amount, modulo, betMask){
      let BN = this.$web3.utils.BN
      let POPCNT_MULT = this.$web3.utils.toBN('0x0000000000002000000000100000000008000000000400000000020000000001')
      let POPCNT_MASK = this.$web3.utils.toBN('0x0001041041041041041041041041041041041041041041041041041041041041')
      let POPCNT_MODULO = this.$web3.utils.toBN('0x3F')
      let MIN_JACKPOT_BET =this.$web3.utils.toBN(this.$web3.utils.toWei('0.1'))
      let JACKPOT_FEE = this.$web3.utils.toBN(this.$web3.utils.toWei('0.001'))
      let HOUSE_EDGE_MINIMUM_AMOUNT = this.$web3.utils.toBN(this.$web3.utils.toWei('0.0003'))
      betMask = this.$web3.utils.toBN(betMask.toString())
      amount = this.$web3.utils.toBN(this.$web3.utils.toWei(amount.toString()))
      modulo = this.$web3.utils.toBN(modulo.toString())
      let rollUnder = betMask
      if ( modulo.lte(new BN('40'))) {
          rollUnder = betMask.mul(POPCNT_MULT).and(POPCNT_MASK).mod(POPCNT_MODULO)
      }
      let jackpotFee = amount.gte(MIN_JACKPOT_BET) ? JACKPOT_FEE : new BN('0')
      let houseEdge = amount.mul(new BN('1')).div(new BN('100')) // 1%
      if (houseEdge.lt(HOUSE_EDGE_MINIMUM_AMOUNT)) {
          houseEdge = HOUSE_EDGE_MINIMUM_AMOUNT
      }
      return amount.sub(houseEdge).sub(jackpotFee).mul(modulo).div(rollUnder)
    },
    getwinAmount(betval,betmask){
      let winAmountBN = this.getWinAmountBN(betval, this.modulo, parseInt(toMask[this.modulo][betmask]))
      let winAmountStr = this.$web3.utils.fromWei(winAmountBN.toString());
      let winAmount = (parseFloat(winAmountStr).toFixed(3)).toString()
      return winAmount
    },
    randomStrategy (id) {
      if (this.gameID == 1) {
        for (let i = 0; i<this.betNum; i++) {
          let maskArr = [1,2]
          this.betArr1[i].betMask = this.getRandomArray(maskArr,id)[0]
          this.betArr1[i].betValue = this.betAmount * Math.pow(2,i)
          this.betArr1[i].odds = (winRatio(this.modulo,this.betArr1[i].betMask.toString()) * 100).toFixed(2)
          this.betArr1[i].winAmount = this.getwinAmount(this.betArr1[i].betValue,this.betArr1[i].betMask.toString)
        }
      } else if (this.gameID == 2) {
        for (let i = 0; i<this.betNum; i++) {
          let maskArr = [1,2,3,4,5,6]
          this.betArr2[i].betMask = this.arraySort(this.getRandomArray(maskArr,id))
          this.betArr2[i].betValue = this.betAmount * Math.pow(2,i)
          this.betArr2[i].odds = (winRatio(this.modulo,this.betArr2[i].betMask.join(',')) * 100).toFixed(2)
          this.betArr2[i].winAmount = this.getwinAmount(this.betArr2[i].betValue,this.betArr2[i].betMask.join(','))
        }
      } else if (this.gameID == 3) {
        for (let i = 0; i<this.betNum; i++) {
          let maskArr = [2,3,4,5,6,7,8,9,10,11,12]
          this.betArr3[i].betMask = this.arraySort(this.getRandomArray(maskArr,id))
          this.betArr3[i].betValue = this.betAmount * Math.pow(2,i)
          this.betArr3[i].odds = (winRatio(this.modulo,this.betArr3[i].betMask.join(',')) * 100).toFixed(2)
          this.betArr3[i].winAmount = this.getwinAmount(this.betArr3[i].betValue,this.betArr3[i].betMask.join(','))
        }
      }
    },
    checkBetMask(gameid,betmasks) {
      if (gameid === 2) {
        if (betmasks.length === 6) {
          let index = betmasks.indexOf(1)
          betmasks.splice(index, 1)
        }
      } else if (gameid === 3) {
        if (betmasks.length === 11) {
          let index = betmasks.indexOf(2)
          betmasks.splice(index, 1)
        }
      } else if (gameid === 4) {

      }
    },
    validate() {
      if (!this.privateKey) {
        this.$message.error('请输入你的私钥信息！')
        return false
      }
      if (!this.betNum) {
        this.$message.error('请选择投注局数！')
        return false
      }
      if (!this.gameID) {
        this.$message.error('请选择一个游戏！')
        return false
      }
      if (!this.endMaxValue && !this.endMinValue) {
        this.$message.error('请输入终止条件！')
        return false
      }
      return true
    },
    gameStart() {
      if (this.validate()) {
        this.getRandom()
      }
    },
    getRandom() {
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
    betOn() {

    },
    gameEnd() {

    }
  }
}
</script>

<style scoped lang="scss">
.autoplay{
  padding:20px 0;
  font-size:14px;
  letter-spacing: 0;
  /deep/ .el-checkbox-group{
    label{
      &:last-child{
        margin-right: 0!important;
      }
    }
    .el-checkbox{
      margin-right: 30px;
    }
    .el-checkbox+.el-checkbox{
      margin-right: 30px;
      margin-left: 0;
    }
  }
  .input-suffix{
    position: relative;
    padding: 0 135px;
    margin-bottom: 15px;
    &.hasinfo{
      padding-top: 25px;
      .info{
        position: absolute;
        left:135px;
        top:0;
        color:red;
        font-size:12px;
      }
      span{
        top:25px;
      }
    }
    span{
      position: absolute;
      left:0;
      top:0;
      text-align: right;
      width:125px;
      line-height: 40px;
    }
    s{
      text-decoration: none;
      margin-left: 10px;
    }
    .num{
      width:100px;
    }
    .pkey{
      width:500px;
      margin-right: 20px;
    }
    .profit{
      width:50px;
    }
    .amount{
      width:100px;
    }
    .startBtn{
      width:100%;
    }
    .el-select-long{
      width:250px;
    }
  }
  .tableShow{
    padding:0 135px;
    margin-bottom: 15px;
    table{
      width:100%;
      table-layout: fixed;
      border-collapse:collapse;
      color: #606266;
      border: 1px solid #ebeef5;
      tr{
        th,td{
          padding: 12px 0;
          min-width: 0;
          box-sizing: border-box;
          text-overflow: ellipsis;
          vertical-align: middle;
          position: relative;
          text-align: left;
          border-right: 1px solid #ebeef5;
          border-bottom: 1px solid #ebeef5;
          .cell{
            box-sizing: border-box;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: normal;
            word-break: break-all;
            line-height: 23px;
            padding-left: 10px;
            padding-right: 10px;
            img{
              width:25px;
              vertical-align: middle;
            }
          }
        }
        th{
          background: #f5f7fa;
          white-space: nowrap;
          overflow: hidden;
          color: #909399;
          font-weight: 500;
          .cell{
            position: relative;
            word-wrap: normal;
            vertical-align: middle;
            width: 100%;
            display: inline-block;
            box-sizing: border-box;
            text-overflow: ellipsis;
          }
          &.sort_col{
            width:70px;
          }
          &.amount_col{
            width:100px;
          }
          &.tip_col{
            width:290px;
          }
        }
      }
    }
  }
  .bottomInfo{
    display:flex;
    margin-top: 30px;
    justify-content:space-around;
    .biCol{
      box-sizing: border-box;
      width:48%;
      border:1px solid #ddd;
      background: #f2f2f2;
      border-radius: 8px;
      padding:20px 30px;
      p{
        margin: 5px 0;
        span{
          color:#888;
        }
      }
    }
  }
}
</style>
