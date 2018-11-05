<template>
 <div class="page">
  <vue-scroll :ops="ops">
      <div class="child-dom">
        <h1>VUESCROLL</h1>
        <ul class="item">
          <li v-for="item of 15" :key="item">{{item}}</li>
        </ul>  
      </div>  
    </vue-scroll>  
 </div>
</template>

<script type="text/ecmascript-6">

export default {
  data () {
    return {
      ops: {
        vuescroll: {
          mode: 'slide', // 默认 native
          pullRefresh: {
            enable: true,
            tips: {
              deactive: 'Pull to Refresh',
              active: 'Release to Refresh',
              start: 'Refreshing...',
              beforeDeactive: 'Refresh Successfully!'
            }
          },
          pushLoad: {
            enable: true,
            tips: {
              deactive: 'Push to Load',
              active: 'Release to Load',
              start: 'Loading...',
              beforeDeactive: 'Load Successfully!'
            },
            auto: false,
            autoLoadDistance: 0
          },
          paging: false,
          zooming: true,
          snapping: {
            enable: false,
            width: 100,
            height: 100
          },
           scroller: {
             /** Enable bouncing (content can be slowly moved outside and jumps back after releasing) */
             bouncing: true,
             /** Enable locking to the main axis if user moves only slightly on one of them at start */
             locking: true,
             /** Minimum zoom level */
             minZoom: 0.5,
             /** Maximum zoom level */
             maxZoom: 3,
             /** Multiply or decrease scrolling speed **/
             speedMultiplier: 1,
             /** This configures the amount of change applied to deceleration when reaching boundaries  **/
             penetrationDeceleration: 0.03,
             /** This configures the amount of change applied to acceleration when reaching boundaries  **/
             penetrationAcceleration: 0.08,
             /** Whether call e.preventDefault event when sliding the content or not */
             preventDefault: true,
             /** Whether call preventDefault when (mouse/touch)move*/
             preventDefaultOnMove: true
           }
        },
        scrollPanel: {
           // 当组件mounted了以后，自动滚动到一个坐标
           initialScrollY: false, // 默认 false
           // 是否禁止x或y方向上的滚动
           scrollingX: true, // 默认 false
        },
        // 滚动条滚动的地方.
        rail: {
          size: '3px' // 默认 5px
        },
        bar: {
          showDelay: 300, // 默认500
          background: '#44A4FD'
        }
      }
    }
  },
  beforeCreate () {
  },
  created () {

  },
  mounted () {

  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
.page{
  height: 100vh;
  .child-dom{
    height: auto;
    .item{
      li{
        font-size: 0.8rem;
        padding: 0.5rem;
      }
    }
  }
}
 
</style>
