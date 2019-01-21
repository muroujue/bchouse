<template>
  <div class="metamask">
    <div v-if="metaMaskBf">
      <div class="install" v-if="!showLogin">
        <h4><img src="~/assets/img/ico_metamask.png" alt="">{{ $t('metaMask.text1') }}</h4>
        <p class="tip">{{ $t('metaMask.text2') }}</p>
        <p class="btn"><a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en" target="_blank">{{ $t('metaMask.text3') }}</a></p>
      </div>
      <div class="login" v-else>
        <h4><img src="~/assets/img/ico_metamask.png" alt="">{{ $t('metaMask.text4') }}</h4>
        <p>{{ $t('metaMask.text5') }}</p>
      </div>
    </div>
    <div class="login network" v-else>
      <h4><img src="~/assets/img/ico_metamask.png" alt="">{{ $t('metaMask.text6') }}</h4>
      <p>{{ $t('metaMask.text7') }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    showLogin:Boolean,
    metaMaskBf:Boolean
  }
};
</script>
<style scoped lang="scss">
.metamask {
  width: 100%;
  height: 180px;
  background: #3c4b5d;
  border-radius: 5px;
  text-align: center;
  box-sizing: border-box;
  box-shadow: 0 0 25px rgba(28, 35, 45, 0.7);
  .install{
    h4 {
      font-size: 24px;
      line-height: 65px;
      color: #fff;
      img {
        vertical-align: middle;
        margin-right: 15px;
      }
    }
    .tip {
      font-size: 16px;
      color: rgba(255, 255, 255, 0.6);
      margin-bottom: 15px;
    }
    .btn {
      a {
        display: block;
        margin: 0 auto;
        width: 320px;
        height: 50px;
        line-height: 50px;
        background: #0971ff;
        font-size: 22px;
        color: #fff;
        border-radius: 5px;
        box-shadow: 0 0 15px rgba(28, 35, 45, 0.7);
      }
    }
  }
  .login{
    color: #fff;
    &.network{
      h4{
        padding-top: 30px;
      }
    }
    h4{
      font-size:30px;
      padding-top: 45px;
      margin-bottom: 15px;
      img{
        vertical-align: -4px;
        margin-right: 5px;
      }
    }
    p{
      font-size:18px;
    }
  }
}
@media screen and (max-width: 500px) {
  .metamask {
    width: 100%;
    padding:15px 10px;
    margin-top: 15px;
    height:auto;
    .install{
      h4 {
        font-size: 20px;
        line-height: 50px;
      }
      .tip {
        font-size: 14px;
        margin-bottom: 15px;
      }
      .btn {
        a {
          max-width: 320px;
          width:auto;
          height: 54px;
          line-height: 54px;
          font-size: 18px;
        }
      }
    }
    .login{
      color: #fff;
      h4{
        font-size:24px;
        padding-top: 0;
        margin-bottom: 5px;
        img{
          vertical-align: -8px;
          margin-right: 5px;
        }
      }
      p{
        font-size:14px;
      }
    }
  }
}
</style>