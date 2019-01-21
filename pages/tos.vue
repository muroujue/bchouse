<template>
  <div class="tos" v-html="$t('tos.cont')"></div>
</template>

<script>
export default {
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
    this.getWeb3()
    setTimeout(()=>{
        this.getWeb3()
    },1000)
  },
  methods:{
    getWeb3() {
      if (this.$web3.currentProvider.isMetaMask) {
        this.$web3.eth.getAccounts().then((data) => {
          if (data.length > 0) {
            this.$store.commit('setAddress', data[0].toLowerCase())
          } else {
            this.$store.commit('setAddress', null)
          }
        })
        this.$web3.eth.net.getId().then((data) => {
          this.$store.commit('setNetworkId', data)
        })
      } else {
        this.$store.commit('setAddress', null)
        this.$store.commit('setNetworkId', null)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.tos{
  width:100%;
  background: rgba(64,80,99,0.6);
  border-radius: 5px;
  box-sizing: border-box;
  padding:60px 80px;
  font-size:18px;
  color:rgba(255,255,255,.7);
  line-height: 2.5;
  box-shadow: 0 0 25px rgba(28,35,45,.7);
  p{
    margin-bottom: 10px;
    font-size:15px;
  }
  ul{
    li{
      position: relative;
      padding-left: 55px;
      &:before{
        content:'';
        position: absolute;
        left:0;
        top:17px;
        width:12px;
        height:12px;
        border-radius: 100%;
        background: #fff;
      }
    }
  }
}
</style>
