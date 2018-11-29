<template>
  <div class="map" id="container" :style="{'height': height+'rem'}"></div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {

    }
  },
  props: {
    height: {
      type: [Number, String],
      default: 8
    }
  },
  mounted () {
    this.initMap()
  },
  methods: {
    initMap () {
      let map = new AMap.Map('container', {
        resizeEnable: true,
        zoom: 11,
        center: [116.397428, 39.9090923],
        viewMode: '3D'
      })
      let marker = new AMap.Marker({
        icon:'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
        position: [121.527246, 31.226786]
      })
      map.add([marker]);
      map.setFitView();
    },
  }
}
</script>

<style scoped lang="scss">
.map{
  width: 100%;
  height: 3rem;
}
</style>
