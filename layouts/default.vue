<template>
  <div class="wrapper">
    <c-header></c-header>
    <section class="container">
      <nuxt/>
      <bottom></bottom>
    </section>
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
  background: url(~/assets/img/bg.png) repeat-y center top;
}
.container {
  min-width: 1000px;
  max-width: 1280px;
  margin: 0 auto;
  padding:30px;
  box-sizing: border-box;
}
@media screen and (max-width: 1024px){
  .container{
    min-width: auto;
    max-width: auto;
    width:100%;
    padding: 30px;
  }
}
@media screen and (max-width: 500px){
  .container{
    padding: 20px;
  }
}
</style>
