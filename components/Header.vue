<template>
  <div id="header">
    <header>
      <nuxt-link to="/" class="logo"><img src="~/assets/img/bc-logo-fully.svg" alt=""></nuxt-link>
      <div class="right clearfix">
        <p class="link">
          <nuxt-link to="/">&nbsp;{{ $t('links.home') }}&nbsp;</nuxt-link>
          <nuxt-link to="/faq">&nbsp;{{ $t('links.qna') }}&nbsp;</nuxt-link>
        </p>
        <ul class="tools">
          <li><a target="_blank" href="https://t.me/joinchat/HLiGaQ-Gw3ztycaiooEbIg"><img src="~/assets/img/ico_telegram.png" alt=""></a></li>
          <li><a target="_blank" href="https://twitter.com/fair_io"><img src="~/assets/img/ico_twitter.png" alt=""></a></li>
          <li><a target="_blank" href="mailto:support.bc@protonmail.com"><img src="~/assets/img/ico_mail.png" alt=""></a></li>
          <li>
            <el-popover placement="bottom" width="200" trigger="click" v-model="langPopVisible">
              <ul class="lang">
                <li @click="setLang('en')"><img src="~/assets/img/en.svg" alt="">English</li>
                <li @click="setLang('ru')"><img src="~/assets/img/ru.svg" alt="">Русский</li>
                <li @click="setLang('cn')"><img src="~/assets/img/zh.svg" alt="">繁體中文</li>
                <li class="jp" @click="setLang('jp')"><img src="~/assets/img/jp.svg" alt="">日本語</li>
                <li class="kr" @click="setLang('kr')"><img src="~/assets/img/kr.svg" alt="">한국어</li>
              </ul>
              <el-button slot="reference" @click="langPopVisible = !langPopVisible">
                <img v-if="lang=='en'" src="~/assets/img/ico_en.png" alt="">
                <img v-if="lang=='ru'" src="~/assets/img/ico_ru.png" alt="">
                <img v-if="lang=='cn'" src="~/assets/img/ico_zh.png" alt="">
                <img v-if="lang=='jp'" src="~/assets/img/ico_jp.png" alt="">
                <img v-if="lang=='kr'" src="~/assets/img/ico_kr.png" alt="">
              </el-button>
            </el-popover>
          </li>
        </ul>
      </div>
    </header>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                langPopVisible:false
            }
        },
        computed:{
            lang() {
                return this.$store.state.locale
            }
        },
        methods:{
            setLang(lang) {
                this.langPopVisible = false
                this.$store.commit('setLang', lang)
                this.$cookies.set('i18nextLng',lang)
                this.$i18n.locale = lang
            }
        }
    }
</script>
<style scoped lang="scss">
  .lang{
    width:120px;
    li{
      padding:10px 0 10px 10px;
      color:#fff;
      cursor: pointer;
      img{
        width:20px;
        vertical-align: top;
        margin-right: 10px;
      }
      &.jp{
        img{
          vertical-align: -1px;
        }
      }
      &.kr{
        img{
          vertical-align: -1px;
        }
      }
    }
  }
  #header {
    width:100%;
    background: #202832;
    header{
      min-width: 1000px;
      max-width: 1280px;
      margin: 0 auto;
      height: 120px;
      line-height: 0;
      font-size: 0;
      display: flex;
      justify-content:space-between;
      align-items:center;
      padding:0 30px;
      box-sizing: border-box;
      .logo{
        img{
          height:60px;
        }
      }
      .right{
        .link{
          float:left;
          border-right:1px solid #374557;
          height: 70px;
          padding:13px 10px 0 0;
          box-sizing:border-box;
          a{
            display: inline-block;
            font-size:18px;
            color:#fff;
            height:44px;
            border:1px solid #464d55;
            border-radius: 5px;
            box-sizing:border-box;
            text-align: center;
            line-height: 42px;
            margin-right: 20px;
          }
        }
        .tools{
          float:left;
          display: flex;
          align-items:center;
          height: 70px;
          li{
            margin-left: 20px;
            a{
              opacity: 0.7;
              transition: opacity 1s ease;
              &:hover{
                opacity: 1;
              }
              img{
                width:50px;
                vertical-align: top;
              }
            }
          }
        }
      }
    }
    /deep/ .el-button{
      background: none;
      border:none;
      padding:0;
      img{
        width:50px;
        vertical-align: top;
      }
    }
  }
  @media screen and (max-width: 1024px){
    #header {
      header{
        min-width:auto;
        max-width:auto;
        width:100%;
        height: 100px;
        .right{
          .link{
            display: none;
          }
          .tools{
            margin-top:5px;
            li{
              margin-left: 15px;
              a{
                opacity: 1;
              }
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: 550px){
    #header {
      header{
        height: 80px;
        padding: 0 10px 0 15px;
        /deep/ .el-button{
          img{
            width:40px;
          }
        }
        .logo{
          img{
            width:140px;
            height:auto;
          }
        }
        .right{
          .tools{
            margin-top:5px;
            li{
              margin-left: 10px;
              a{
                img{
                  width:40px;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
