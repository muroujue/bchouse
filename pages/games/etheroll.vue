<template>
  <div class="games">
    <el-row :gutter="40">
      <el-col :lg="8" :md="16" :xs="24">
        <div class="play" :class={ethMaskOn:emShow}>
          <h3 v-html="$t('game4.name')"></h3>
          <div class="slider">
            <el-slider v-model="erValue" :max="sliderMax" :min="sliderMin" :show-tooltip="false"></el-slider>
            <div class="scale">
              <p class="scaleLine"><span v-for="(item,index) in scaleLines" :key="index"></span></p>
              <p class="scaleTxt"><span v-for="(item,index) in scaleTxts" :key="index">{{item}}</span></p>
            </div>
          </div>
          <p class="desc">{{$t('game4.desc')}}</p>
          <bet-handle gameId="4" :betMask="erValue+''" @ethmask="getEthmask"></bet-handle>
        </div>
      </el-col>
      <el-col :lg="7" :md="8" :xs="24"><notice gameId="4" :betMask="erValue+''" /></el-col>
      <el-col :lg="9" :md="24" :xs="24"><history gameId="4" /></el-col>
    </el-row>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import Notice from '~/components/Notice'
import History from '~/components/History'
import BetHandle from '~/components/BetHandle'

export default {
  components: {
    Notice,
    History,
    BetHandle
  },
  data() {
    return {
      erValue: 50,
      sliderMax:97,
      sliderMin:1,
      scaleLines: new Array(35),
      scaleTxts: ["1%  ", "25% ", "50% ", "75% ", "100%"],
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
  methods:{
    getEthmask(val) {
      this.emShow = val
    }
  }
};
</script>

<style scoped lang="scss">
.play {
  &.ethMaskOn{
    h3,.slider,.desc{
      filter: blur(30px);
    }
    /deep/ .betInn{
      filter: blur(30px);
    }
  }
  h3 {
    width: 340px;
    box-sizing: border-box;
    font-size: 40px;
    margin: 0 auto 20px;
    background: url(~/assets/img/ico_etheroll.png) no-repeat 0 6px;
    background-size: 51px auto;
    padding-left: 70px;
    text-align: left;
  }
  .slider {
    width: 340px;
    margin: 0 auto 20px;
    padding-bottom: 29px;
    position: relative;
    .scale {
      position: absolute;
      width: 100%;
      left: 0;
      bottom: 0;
      .scaleLine {
        display: flex;
        justify-content: space-between;
        span {
          width: 1px;
          height: 5px;
          background: #5b6572;
        }
      }
      .scaleTxt {
        margin-top: 5px;
        color: rgba(255, 255, 255, 0.6);
        font-size: 14px;
        display: flex;
        justify-content: space-between;
        span {
          width: 35px;
          letter-spacing: -1px;
          text-align: left;
        }
      }
    }
  }
  /deep/ .el-slider {
    width: 340px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
    .el-slider__runway {
      background: #252e3a;
      height: 36px;
      border-radius: 5px;
      .el-slider__bar {
        height: 36px;
        border-radius: 5px;
        background: #429a54;
      }
      .el-slider__button-wrapper {
        height: 52px;
        width: 22px;
        top: -8px;
        .el-slider__button {
          height: 52px;
          width: 22px;
          border-radius: 5px;
          background: #fff;
          border: none;
          &:hover,&.dragging,&.hover {
            transform: scale(1);
          }
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
  .play {
    h3 {
      width:100%;
      font-size: 28px;
      margin: 0 auto 10px;
      background: url(~/assets/img/ico_etheroll.png) no-repeat 0 0;
      background-size: 52px auto;
    }
    .slider {
      width: 100%;
      margin: 0 auto 10px;
      .scale {
        .scaleTxt {
          font-size: 12px;
          span {
            width: 30px;
          }
        }
      }
    }
    /deep/ .el-slider {
      width: 100%;
      .el-slider__runway {
        background: rgba(64, 80, 99, .6);
        height: 36px;
      }
    }
  }
}
</style>