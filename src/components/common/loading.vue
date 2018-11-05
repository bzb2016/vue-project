<template>
  <section class="loading-box">
    <div class="mock">
      <div class="main">loading...</div>
    </div> 
  </section>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
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
   section.loading-box{
     position: relative;
     width: 100vh;
     height: 100vh;
     .mock{
       position: absolute;
       z-index: 100;
       width: 100vh;
       height: 100vh;
       background:#abb2bf;
       .main{
         margin: 200px auto;
         text-align: center;
       }
     }
   }
</style>
