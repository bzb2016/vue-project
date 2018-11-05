<template>
  <div class="not-found-page" :style="{top: top}">
    <img :src="noDataImg" alt="">
    <p class="txt">{{tipTxt}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    top: {
      type: String,
      default: '35%'
    },
    tipTxt:{
      type: String,
      default: '没有数据！'
    }
  },
  data () {
    return {
      noDataImg: require('./../../assets/image/icon/status8.png')
    }
  },
  created () {

  },
  components: {

  },
  mounted () {

  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
 .not-found-page{
   position: fixed;
   width: 100%;
   height: auto;
   left: 0;
   img{
     display: block;
     margin: 0 auto;
     width:2.5rem;
     font-size: 0;
   }
   .txt{
     margin-top: .1rem;
     color:#000;
   }
 }
</style>
