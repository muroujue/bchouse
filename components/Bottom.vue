<template>
  <section class="bottom">
      <ul class="clearfix">
          <li>
              <dl>
                  <dt>{{$t('bottomZone.unit1.title')}}</dt>
                  <dd><nuxt-link to="/games/coin-flip">{{$t('bottomZone.unit1.info')[0]}}</nuxt-link></dd>
                  <dd><nuxt-link to="/games/dice">{{$t('bottomZone.unit1.info')[1]}}</nuxt-link></dd>
                  <dd><nuxt-link to="/games/two-dice">{{$t('bottomZone.unit1.info')[2]}}</nuxt-link></dd>
                  <dd><nuxt-link to="/games/etheroll">{{$t('bottomZone.unit1.info')[3]}}</nuxt-link></dd>
              </dl>
          </li>
          <li>
              <dl>
                  <dt>{{$t('bottomZone.unit2.title')}}</dt>
                  <dd><a target="_blank" :href="''+networkUrl+'/address/'+address+''">{{$t('bottomZone.unit2.info')[0]}}{{eth}}{{$t('eth')}}</a></dd>
                  <dd><a target="_blank" :href="''+networkUrl+''">{{$t('bottomZone.unit2.info')[1]}}{{networkType}}</a></dd>
                  <dd><a target="_blank" :href="''+networkUrl+'/address/'+contractAddr+''">{{$t('bottomZone.unit2.info')[2]}}</a></dd>
              </dl>
          </li>
          <li>
              <dl>
                  <dt>{{$t('bottomZone.unit3.title')}}</dt>
                  <dd><a target="_blank" href="https://github.com/FairHouseIO/fairhosue-contract">Github</a></dd>
                  <dd><a target="_blank" href="https://www.stateofthedapps.com/dapps/fairhouse">State-of-the-DApps</a></dd>
                  <dd><a target="_blank" href="https://dappradar.com/app/1116/fairhouse">DAppRadar</a></dd>
                  <dd><a target="_blank" href="https://dapp.review/dapp/1355">DappReview</a></dd>
                  <dd><a target="_blank" href="https://dapponline.io/dappDetail/1566">DappOnline</a></dd>
              </dl>
          </li>
          <li>
              <dl>
                  <dt>{{$t('bottomZone.unit4.title')}}</dt>
                  <dd><a target="_blank" href="https://t.me/joinchat/HLiGaQ-Gw3ztycaiooEbIg">Telegram</a></dd>
                  <dd><a target="_blank" href="https://twitter.com/fair_io">Twitter</a></dd>
                  <dd><a target="_blank" href="mailto:support.fairhouse@protonmail.com">{{$t('bottomZone.unit4.info')[0]}}</a></dd>
                  <dd><a target="_blank" href="/tos">{{$t('bottomZone.unit4.info')[1]}}</a></dd>
              </dl>
          </li>
      </ul>
  </section>
</template>

<script>
import { checkNet,checkNetUrl } from '~/plugins/utils'
import contractAddress from '~/settings/contractAddress.js'

export default {
    data(){
        return {
            networkType:null,
            networkUrl:null,
            eth:0,
            address: null,
            contractAddr: contractAddress,
            timer:null
        }
    },
    mounted() {
        setTimeout(()=>{
            this.getInfo()
        },2000)
        this.timer = setInterval(() => {
            this.getInfo()
        },10000)
    },
    methods: {
        getInfo() {
            this.networkType = checkNet(this.$store.state.networkId)
            this.networkUrl = checkNetUrl(this.$store.state.networkId)
            this.address = this.$store.state.address
            if (this.address && this.address != '' && this.address != 'null') {
                this.$web3.eth.getBalance(this.$store.state.address).then((data) => {
                    this.eth = parseFloat(this.$web3.utils.fromWei(data.toString())).toFixed(2)
                })
            }
        }
    },
    destroyed() {
        clearInterval(this.timer)
    }
}
</script>

<style scoped lang="scss">
.bottom {
    width:100%;
    background: #232c36;
    border:1px solid #43484e;
    box-sizing: border-box;
    text-align: left;
    margin-top:50px;
    ul{
        padding:45px 0;
        li{
            float:left;
            width:25%;
            box-sizing: border-box;
            border-right: #313a43 1px solid;
            padding-left:5%;
            &:last-child{
                border-right:none;
            }
            dl{
                dt{
                    position: relative;
                    color:#fff;
                    font-size:18px;
                    &:before{
                        content:'';
                        position: absolute;
                        width:12px;
                        height:12px;
                        border-radius: 100%;
                        background: #1c6af7;
                        left:-30px;
                        top:6px;
                    }
                }
                dd{
                    color:#9fa1a6;
                    font-size:14px;
                    height:20px;
                    padding-top: 20px;
                    a{
                        color:#9fa1a6;
                    }
                }
            }
        }
    }
}
@media screen and (max-width: 1024px){
    .bottom{
        margin-top: 40px;
        ul{
            li{
                width:50%;
                height:170px;
                padding-left:8%;
                dl{
                    dd{
                        height:20px;
                        padding-top: 12px;
                    }
                }
            }
        }
    }
}
@media screen and (max-width: 550px){
    .bottom{
        ul{
            padding:15px 0;
            li{
                width:100%;
                float:none;
                height:auto;
                padding-left:16%;
                margin-bottom: 10px;
                &:last-child{
                    margin-bottom: 0;
                }
                dl{
                    dt{
                        font-size:16px;
                    }
                    dd{
                        font-size:14px;
                        height:20px;
                        padding-top:5px;
                    }
                }
            }
        }
    }
}
</style>
