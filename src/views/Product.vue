<template>
  <div class="page">
    <a href="#" class="center-to-head">鼠标经过从中间向两端延伸的下划线</a>
    <div>
      <span>{{count}}</span>
      <button type="button" @click="showCount">showCount</button>
    </div>
    <div class="mt20 warp-container" ref="warpper">
      <ul class="warp-content" ref="tabcontent">
        <li class="warp-item" :class="{'active': navId === item.id}" v-for="item of navList" :key="item.id" @click="handlerNav(item.id)">{{item.titleName}}</li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapState} from 'vuex'
import Bscroll from 'better-scroll'
export default {
  data() {
    return {
      navList: [
        {id: 1, titleName: '个人护理'},
        {id: 2, titleName: '彩妆香水'},
        {id: 3, titleName: '母婴亲子'},
        {id: 4, titleName: '家居家装'},
        {id: 6, titleName: '珠宝配饰'},
        {id: 7, titleName: '服饰鞋帽'},
        {id: 8, titleName: '礼品箱包'},
        {id: 9, titleName: '食品饮料'},
        {id: 10, titleName: '珠宝配饰'},
        {id: 11, titleName: '服饰鞋帽'},
        {id: 12, titleName: '礼品箱包'},
        {id: 13, titleName: '食品饮料'}
      ],
      navId: 1,
      scroll: null
    }
  },
  created () {
    
  },
  computed: {
    ...mapState({
      count (state) {
        return state.count
      }
    })
  },
  mounted () {
    this.InitTabScroll()
  },
  methods: { 
    showCount () {
      this.$store.commit('increment', 10)
    },
    handlerNav (id) {
      this.navId = id
    },
    InitTabScroll () {
      let self = this
      let width = this.navList.length*62
      this.$refs.tabcontent.style.width = width + 'px'
       self.$nextTick(() => {
          if(!self.scroll) {
            self.scroll = new Bscroll(self.$refs.warpper, {
              start: 0,
              scrollX: true,
              scrollY: false,
              click: true
            })
          }else{
            self.scroll.refresh();
          } 
        })
      
    }
  }
}
</script>

<style scoped lang="scss">
.page{
  .mt10{margin-top: 10px;} 
  .mt20{margin-top: 20px;}
  .warp-container{
    width: 100%;
    white-space: nowrap;
    // overflow: hidden;
    .warp-content{
      font-size: 0;
      text-align: center;
      height: 45px;
      width: 100%;
      .warp-item{
        display: inline-block;
        margin-right: 30px;
        font-size: 18px;
        height: 100%;
        &:last-child{
          margin-right: 0;
        }
      }
      .active{
        color: #FF4F92;
        border-bottom: 1px solid #FF4F92;
      }
    }
  } 
  a{
    font-size: 28px;
    text-decoration: none;
    color:#000;
  }
  .center-to-head{
    position: relative;
  }
  .center-to-head::after{
    content: "";
    display: block;
    position: absolute;
    bottom: -15px;
    z-index: 10000;
    width: 100%;
    height: 3px;
    transition: all 0.3s ease-out;
    transform: scale3d(0,1,1);
    transform-origin: 50% 0;
    background-color: red;
  }
  .center-to-head:hover::after{
    transform: scale3d(1,1,1);
  }
}
</style>
