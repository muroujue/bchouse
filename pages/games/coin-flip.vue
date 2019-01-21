<template>
  <div class="games">
    <el-row :gutter="40">
      <el-col :lg="8" :md="16" :xs="24">
        <div class="play" :class={ethMaskOn:emShow}>
          <h3><img src="~/assets/img/ico_dollar.png" />{{$t('game1.name')}}</h3>
          <div class="coin">
            <span class="coin_front" :class="[coinSide==1?'active':'off']" @click="front"></span>
            <span class="coin_back" :class="[coinSide==2?'active':'off']" @click="back"></span>
          </div>
          <p class="desc">{{$t('game1.desc')}}</p>
          <bet-handle gameId="1" :betMask="coinSide+''" @ethmask="getEthmask"></bet-handle>
        </div>
      </el-col>
      <el-col :lg="7" :md="8" :xs="24"><notice gameId="1" :betMask="coinSide+''" /></el-col>
      <el-col :lg="9" :md="24" :xs="24"><history gameId="1" /></el-col>
    </el-row>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import Notice from '~/components/Notice'
import History from '~/components/History'
import BetHandle from '~/components/BetHandle'
import { mapState } from 'vuex'

export default {
  components:{
    Notice,
    History,
    BetHandle
  },
  data() {
    return {
      coinSide: 1,
      emShow: false,
      emState:0
    };
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
  mounted() {

  },
  methods:{
    front() {
      this.coinSide = 1
    },
    back() {
      this.coinSide = 2
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
    h3,.coin,.desc{
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
  .coin{
    margin-bottom: 20px;
    span{
      display: inline-block;
      width:100px;
      height: 100px;
      margin: 0 15px;
      cursor: pointer;
      transition: background .5s ease;
      &.coin_front{
        &.off{
          background: url(~/assets/img/ico_coin1_2.png) no-repeat 0 0;
          background-size: 100% auto;
        }
        &.active{
          background: url(~/assets/img/ico_coin1_1.png) no-repeat 0 0;
          background-size: 100% auto;
        }
      }
      &.coin_back{
        &.off{
          background: url(~/assets/img/ico_coin2_2.png) no-repeat 0 0;
          background-size: 100% auto;
        }
        &.active{
          background: url(~/assets/img/ico_coin2_1.png) no-repeat 0 0;
          background-size: 100% auto;
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
  .play{
    .coin{
      margin-bottom: 10px;
      span{
        width:60px;
        height: 60px;
        margin: 0 15px;
      }
    }
  }
}
</style>
