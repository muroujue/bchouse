<template>
  <div class="games">
    <el-row :gutter="40">
      <el-col :lg="8" :md="16" :xs="24">
        <div class="play" :class={ethMaskOn:emShow}>
          <h3><img src="~/assets/img/ico_dicedb.png" />{{$t('game3.name')}}</h3>
          <div class="dice2">
            <span :class="[twoDiceArr.indexOf(2) > -1 ? 'active' : 'off']" @click="chooseDice(2)">2</span>
            <span :class="[twoDiceArr.indexOf(3) > -1 ? 'active' : 'off']" @click="chooseDice(3)">3</span>
            <span :class="[twoDiceArr.indexOf(4) > -1 ? 'active' : 'off']" @click="chooseDice(4)">4</span>
            <span :class="[twoDiceArr.indexOf(5) > -1 ? 'active' : 'off']" @click="chooseDice(5)">5</span>
            <span :class="[twoDiceArr.indexOf(6) > -1 ? 'active' : 'off']" @click="chooseDice(6)">6</span>
            <span :class="[twoDiceArr.indexOf(7) > -1 ? 'active' : 'off']" @click="chooseDice(7)">7</span>
            <span :class="[twoDiceArr.indexOf(8) > -1 ? 'active' : 'off']" @click="chooseDice(8)">8</span>
            <span :class="[twoDiceArr.indexOf(9) > -1 ? 'active' : 'off']" @click="chooseDice(9)">9</span>
            <span :class="[twoDiceArr.indexOf(10) > -1 ? 'active' : 'off']" @click="chooseDice(10)">10</span>
            <span :class="[twoDiceArr.indexOf(11) > -1 ? 'active' : 'off']" @click="chooseDice(11)">11</span>
            <span :class="[twoDiceArr.indexOf(12) > -1 ? 'active' : 'off']" @click="chooseDice(12)">12</span>
          </div>
          <p class="desc">{{$t('game3.desc')}}</p>
          <bet-handle gameId="3" :betMask="twoDiceArrOrder.join()" @ethmask="getEthmask"></bet-handle>
        </div>
      </el-col>
      <el-col :lg="7" :md="8" :xs="24"><notice gameId="3" :betMask="twoDiceArrOrder.join()" /></el-col>
      <el-col :lg="9" :md="24" :xs="24"><history gameId="3" /></el-col>
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
      twoDiceArr: [],
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
    twoDiceArrOrder() {
      return this.twoDiceArr.sort((a,b) => {
        return a-b
      })
    }
  },
  mounted(){
    while( this.twoDiceArr.length < 5 ){
      let a = parseInt(Math.random()*11) + 2
      if (this.twoDiceArr.indexOf(a)<0) {
        this.twoDiceArr.push(a)
      }
    }
  },
  methods: {
    chooseDice(num){
      if (this.twoDiceArr.indexOf(num) > -1) {
        console.log(this.twoDiceArr.length)
        if (this.twoDiceArr.length > 1) {
          this.twoDiceArr.splice(this.twoDiceArr.indexOf(num), 1)
        }
      } else {
        this.twoDiceArr.push(num)
        if (this.twoDiceArr.length === 11) {
          let index = this.twoDiceArr.indexOf(2)
          this.twoDiceArr.splice(index, 1)
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
    h3,.dice2,.desc{
      filter: blur(30px);
    }
    /deep/ .betInn{
      filter: blur(30px);
    }
  }
  h3{
    font-size:40px;
    margin-bottom: 20px;
    img{
      width:60px;
      vertical-align: middle;
      margin-right: 20px;
    }
  }
  .dice2{
    display:flex;
    width:272px;
    margin: 0 auto;
    flex-wrap: wrap;
    span{
      width:48px;
      height: 42px;
      line-height: 42px;
      margin: 0 10px 15px;
      color:#333;
      cursor: pointer;
      &.off{
        background: url(~/assets/img/ico_dice2_off.png) no-repeat 0 0;
      }
      &.active{
        background: url(~/assets/img/ico_dice2_on.png) no-repeat 0 0;
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