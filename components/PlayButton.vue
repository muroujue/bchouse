<template>
  <div class="play_btn"><span>{{txt}}</span></div>
</template>

<script>
export default {
  props: ["txt"]
};
</script>
<style scoped lang="scss">
.play_btn {
  padding-bottom: 70px;
  span {
    display: block;
    width: 320px;
    height: 70px;
    line-height: 70px;
    margin: 0 auto;
    background: url(~/assets/img/btn_1.png) no-repeat 0 0;
    background-size:100% auto;
    font-size: 26px;
    color: #fff;
    transition: background 1s ease;
    cursor: pointer;
    box-shadow: 0 0 25px rgba(28, 35, 45, 0.7);
    &:hover {
      background: url(~/assets/img/btn_2.png) no-repeat 0 0;
      background-size:100% auto;
    }
  }
}
@media screen and (max-width: 500px) {
  .play_btn {
    margin:20px 0;
    padding-bottom: 10px;
    span {
      width: 260px;
      height: 58px;
      line-height:58px;
      font-size: 22px;
    }
  }
}
</style>