<template>
  <div class="games">
    <el-row :gutter="40">
      <el-col :lg="8" :md="16" :xs="24">
        <div class="play" :class={ethMaskOn:emShow}>
          <h3><img src="~/assets/img/ico_dice.png" />{{$t('game2.name')}}</h3>
          <div class="dice">
            <span class="dice1" :class="[diceArr.indexOf(1) > -1 ? 'active' : 'off']" @click="chooseDice(1)"></span>
            <span class="dice2" :class="[diceArr.indexOf(2) > -1 ? 'active' : 'off']" @click="chooseDice(2)"></span>
            <span class="dice3" :class="[diceArr.indexOf(3) > -1 ? 'active' : 'off']" @click="chooseDice(3)"></span>
            <span class="dice4" :class="[diceArr.indexOf(4) > -1 ? 'active' : 'off']" @click="chooseDice(4)"></span>
            <span class="dice5" :class="[diceArr.indexOf(5) > -1 ? 'active' : 'off']" @click="chooseDice(5)"></span>
            <span class="dice6" :class="[diceArr.indexOf(6) > -1 ? 'active' : 'off']" @click="chooseDice(6)"></span>
          </div>
          <p class="desc">{{$t('game2.desc')}}</p>
          <bet-handle gameId="2" :betMask="diceArrOrder.join()" @ethmask="getEthmask"></bet-handle>
        </div>
      </el-col>
      <el-col :lg="7" :md="8" :xs="24"><notice gameId="2" :betMask="diceArrOrder.join()" /></el-col>
      <el-col :lg="9" :md="24" :xs="24"><history gameId="2" /></el-col>
    </el-row>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import Notice from '~/components/Notice'
import History from '~/components/History'
import BetHandle from '~/components/BetHandle'

export default {
  components:{
    Notice,
    History,
    BetHandle
  },
  data() {
    return {
      diceArr: [],
      emShow: false
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
    diceArrOrder() {
      return this.diceArr.sort((a,b) => {
        return a-b
      })
    }
  },
  mounted(){
    while(this.diceArr.length<3){
      let a = parseInt(Math.random()*6) + 1
      if (this.diceArr.indexOf(a)<0) {
        this.diceArr.push(a)
      }
    }
  },
  methods: {
    chooseDice(num){
      if (this.diceArr.indexOf(num) > -1) {
        console.log(this.diceArr.length)
        if (this.diceArr.length > 1) {
          this.diceArr.splice(this.diceArr.indexOf(num), 1)
        }
      } else {
        this.diceArr.push(num)
        if (this.diceArr.length === 6) {
          let index = this.diceArr.indexOf(1)
          this.diceArr.splice(index, 1)
        }
      }
    },
    getEthmask(val) {
      this.emShow = val
    }
  }
}
</script>

<style scoped lang="scss">
.play{
  &.ethMaskOn{
    h3,.dice,.desc{
      filter: blur(30px);
    }
    /deep/ .betInn{
      filter: blur(30px);
    }
  }
  h3{
    font-size:40px;
    margin-bottom: 40px;
    img{
      width:60px;
      vertical-align: middle;
      margin-right: 20px;
    }
  }
  .dice{
    display:flex;
    width:255px;
    margin: 0 auto;
    flex-wrap: wrap;
    span{
      width:55px;
      height: 55px;
      margin: 0 15px 20px;
      cursor: pointer;
      &.dice1{
        &.off{
          background: url(~/assets/img/dice1_2.png) no-repeat 0 0;
        }
        &.active{
          background: url(~/assets/img/dice1_1.png) no-repeat 0 0;
        }
      }
      &.dice2{
        &.off{
          background: url(~/assets/img/dice2_2.png) no-repeat 0 0;
        }
        &.active{
          background: url(~/assets/img/dice2_1.png) no-repeat 0 0;
        }
      }
      &.dice3{
        &.off{
          background: url(~/assets/img/dice3_2.png) no-repeat 0 0;
        }
        &.active{
          background: url(~/assets/img/dice3_1.png) no-repeat 0 0;
        }
      }
      &.dice4{
        &.off{
          background: url(~/assets/img/dice4_2.png) no-repeat 0 0;
        }
        &.active{
          background: url(~/assets/img/dice4_1.png) no-repeat 0 0;
        }
      }
      &.dice5{
        &.off{
          background: url(~/assets/img/dice5_2.png) no-repeat 0 0;
        }
        &.active{
          background: url(~/assets/img/dice5_1.png) no-repeat 0 0;
        }
      }
      &.dice6{
        &.off{
          background: url(~/assets/img/dice6_2.png) no-repeat 0 0;
        }
        &.active{
          background: url(~/assets/img/dice6_1.png) no-repeat 0 0;
        }
      }
    }
  }
}
@media screen and (max-width: 500px) {
  .games{
    /deep/ .el-col{
      margin-bottom: 20px;
      &:last-child{
        margin-bottom: 0;
      }
    }
  }
}
</style>