<template>
  <div class="notice">
      <ul>
          <li>
              <h4>{{$t('noticeZone.title1')}}</h4>
              <p class="cont">{{odds}}%</p>
          </li>
          <li class="bet">
              <h4>{{$t('noticeZone.title2')}}</h4>
              <p class="cont"><img src="~/assets/img/ico_coin.png" alt="">{{winTimes}} X</p>
              <em>{{$t('noticeZone.text1')}}{{winAmount}}{{$t('eth')}}</em>
              <span class="tip">{{fee}}</span>
          </li>
          <li class="award">
              <h4>{{$t('noticeZone.title3')}}</h4>
              <p class="cont"><img src="~/assets/img/ico_award.png" alt="">{{jackpot}}<i>{{$t('eth')}}</i></p>
              <em>{{$t('noticeZone.text3')}}</em>
          </li>
      </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from '~/plugins/axios'
import { winRatio,getmodulo } from '~/plugins/utils'
import toMask from '~/settings/display_to_mask.json'
import BigNumber from 'bignumber.js'

export default {
  props:{
    gameId:String,
    betMask:String
  },
  data() {
    return {
      winAmount:'0.196',
      winTimes:'1.96',
      jackpot:'',
      fee:null
    }
  },
  computed:{
    ...mapState([
      'betValue'
    ]),
    modulo() {
      return getmodulo(this.gameId)
    },
    odds() {
      return (winRatio(this.modulo,this.betMask) * 100).toFixed(2)
    }
  },
  mounted() {
    this.getJackpot()
    this.$nextTick(() => {
      this.getWinAmountTimes()
    })
  },
  watch:{
    betValue(val) {
      this.getWinAmountTimes()
      if (val == 0.01) {
        this.fee = this.$t('noticeZone.fee')[3]
      } else if (val == 0.02) {
        this.fee = this.$t('noticeZone.fee')[2]
      } else if (val > 0.02 && val < 0.1) {
        this.fee = this.$t('noticeZone.fee')[1]
      } else {
        this.fee = this.$t('noticeZone.fee')[0]
      }
    },
    betMask(val) {
      this.getWinAmountTimes()
    }
  },
  methods: {
    getWinAmountTimes() {
      console.log(this.betMask)
      let winAmountBN = this.getWinAmountBN(this.betValue, this.modulo, parseInt(toMask[this.modulo][this.betMask]))
      let winAmountStr = this.$web3.utils.fromWei(winAmountBN.toString());
      this.winAmount = (parseFloat(winAmountStr).toFixed(3)).toString()
      this.winTimes = (this.getWinTimes(winAmountBN,this.betValue).toFixed(2)).toString()
    },
    getWinTimes(winAmountBN,amount){
      let _winAmountBN = this.$web3.utils.fromWei(winAmountBN.toString(), 'shannon')
      let amountBN = this.$web3.utils.fromWei(this.$web3.utils.toWei(amount.toString()).toString(), 'shannon')
      let amountBig = new BigNumber(amountBN.toString())
      let winAmount = new BigNumber(_winAmountBN.toString())
      let winTimes = winAmount.div(amountBig)
      return winTimes
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
    getJackpot(){
      let jackpotData = axios.get('/v1/jackpot').then((res) => {
        if (res.data) {
          this.jackpot = this.$web3.utils.fromWei(res.data.jackpot.amount)
        }
      })

    }
  }
};
</script>
<style scoped lang="scss">
.notice {
  width: 100%;
  background: rgba(64, 80, 99, 0.6);
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 18px;
  box-shadow: 0 0 25px rgba(28, 35, 45, 0.7);
  position: relative;
  color: #fff;
  height: 680px;
  padding: 0 60px;
  ul {
    display: flex;
    flex-direction: column;
    height: 680px;
    li {
      flex: 1;
      text-align: center;
      justify-content: center;
      flex-direction: column;
      display: flex;
      border-bottom: 1px solid #515962;
      &:last-child {
        border-bottom: none;
      }
      h4 {
        font-size: 18px;
      }
      .cont {
        position: relative;
        font-size: 30px;
        line-height: 1.8;
        i {
          font-size: 18px;
        }
        img{
          width:28px;
          margin-right: 10px;
        }
      }
      em{
        color: rgba(81, 234, 85, 0.5);
      }
      .tip {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.5);
      }
    }
  }
}
@media screen and (max-width: 1200px){
  .notice {
      padding:0 25px;
    ul {
      li {
          .cont{
              font-size:32px;
          }
      }
    }
  }
}
@media screen and (max-width: 1023px) {
  .notice {
    height: 200px;
    padding: 0;
    ul {
      flex-direction: row;
      height: 200px;
      li {
        border-bottom: none;
        &:nth-child(2) {
          order: -1;
        }
      }
    }
  }
}
@media screen and (max-width: 800px) {
  .notice {
    ul {
      li {
        .cont{
            font-size:28px;
        }
      }
    }
  }
}
@media screen and (max-width: 500px) {
  .notice {
    height:auto;
    padding:0 15px;
    ul {
      height:auto;
      flex-direction: column;
      li {
        border-bottom: 1px solid #515962;
        padding:15px 0;
        &:last-child {
          border-bottom: none;
        }
        h4 {
          font-size: 16px;
        }
        .cont {
          font-size: 22px;
          i {
            font-size: 14px;
          }
        }
        em{
          font-size:14px;
        }
        .tip {
          font-size: 12px;
        }
      }
    }
  }
}
</style>