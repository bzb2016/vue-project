<template>
  <div id="app">
    <Loading v-if="loading"></Loading>
    <transition :name="'slide-' + (direction === 'forward'? 'left' : 'right')">
      <router-view/>
    </transition>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
export default {
  name: "App",
  computed: {
    ...mapState(['direction', 'loading'])
  },
}
</script>

<style lang="scss">
html,body{
  display: block;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  background: #fff;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
// 左右无缝移动切换页面
  .slide-left-enter-active,
  .slide-right-enter-active,
  .slide-left-leave-active,
  .slide-right-leave-active {
    width: 100%;
    height: 100%;
    will-change: transform;
    transition: all 0.5s;
    top: 0;
    position: absolute;
    backface-visibility: hidden;
    perspective: 1000;
  }

  .slide-left-enter,
  .slide-right-leave-active {
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
  }

  .slide-left-leave-active,
  .slide-right-enter {
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
}
</style>
