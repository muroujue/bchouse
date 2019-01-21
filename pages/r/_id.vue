<template>
  <div class="user">

  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  async asyncData({ app, params, redirect, error }) {
    try {
      let recCode = params.id ? params.id : null
      console.log(params)
      if (recCode) {
        app.$cookies.set('recCode',recCode.toLowerCase())
      }
      redirect({ path: '/' })
    } catch (err) {
      error({ statusCode: 500, message: 'Oops, An Error Occurred' })
    }
  },
  mounted() {

  },
  methods:{
  }
}
</script>
