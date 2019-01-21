<template>
  <section class="container">
    <m-header/>
    <h1 class="title">
      {{ error.statusCode }}
    </h1>
    <h2 class="info">
      {{ error.message }}
    </h2>

  </section>
</template>
<script>
import MHeader from '~/components/Header.vue'
export default {
  props: ['error'],
  components: {
    MHeader
  },
  mounted() {
    setTimeout(() => {
      this.$router.replace('/')
    },5000)
  }
}
</script>

<style lang="scss" scoped>
.logo {
  display:block;
  width:9rem;
  margin: 0 auto;
  padding-top:1.07rem;
}
.title
{
  margin-top: 0.2rem;
  font-size: 5em;
  text-align: center;
}
.info
{
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
  text-align: center;
}
</style>
