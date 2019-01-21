<template>
  <div class="wrapper">
    <c-header></c-header>
    <section class="container">
      <nuxt/>
    </section>
    <footer>
      <bottom></bottom>
    </footer>
  </div>
</template>

<script>
import CHeader from '~/components/Header'
import Bottom from '~/components/Bottom'

export default {
  components:{
    CHeader,
    Bottom
  }
}
</script>

<style lang="scss">
.wrapper{
  background: #f2f2f2;
}
.container {
  min-width: 1000px;
  max-width: 1280px;
  margin: 0 auto;
  padding:30px;
  box-sizing: border-box;
  background: #fff;
}
footer{
  background-color:#232c36;
  /deep/ .bottom{
    margin-top: 0!important;
    min-width: 1000px;
    max-width: 1280px;
    margin: 0 auto;
    box-sizing: border-box;
    border:none!important;
  }
}
@media screen and (max-width: 1024px){
  .container{
    min-width: auto;
    max-width: auto;
    width:100%;
    padding: 30px;
  }
  footer{
    /deep/ .bottom{
      min-width: auto;
      max-width: auto;
      width:100%;
    }
  }
}
@media screen and (max-width: 500px){
  .container{
    padding: 20px;
  }
  footer{
    /deep/ .bottom{
      padding: 0 15px;
      li{
        border-right:none!important;
        margin:8px 0;
      }
    }
  }
}
</style>
