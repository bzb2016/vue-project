<template>
<transition name="fade">
  <div class="psd-box" v-if="show">
     <div class="pas-content">
       <div class="show-pas">
         <input type="password" v-for="(item,index) in numList" :key="index" :value="item">
       </div>
       <ul class="input-pas">
         <li class="input-num" v-for="(item,index) in 9" :key="index" @click="getNum($event, item)">{{item}}</li>
       </ul>
     </div>
  </div>
</transition>

</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      numList: [],
    }
  },
  props:{
    show: {
      type: Boolean,
      default: false
    }
  },
  created () {

  },
  components: {

  },
  mounted () {
    
  },
  methods: {
    getNum (evt, num) {
      let self = this
      this.numList.push(num)
      setTimeout(() =>{
        if (self.numList.length >= 6) {
          self.$emit('close', false)
          self.$emit('input', self.numList)
          self.numList = []
        }
      }, 1000)
    } 
  }
}
</script>

<style scoped lang="scss">
  .psd-box{
    display: block;
    position: fixed;
    bottom: 0;
    z-index: 10;
    width: 100%;
    background: #E7EAED;
    border: 1px solid #eee;
    overflow: hidden;
    .pas-content{
      width: 100%;
      height: 10rem;
      .show-pas{
        padding-left: 0.9rem;
        height: 2rem;
        background: #fff;
        text-align: left;
        input{
          width: 15%;
          height: 1.5rem;
          border: 1px solid #999;
          border-right: none;
          text-align: center;
          &:last-child{
            border-right: 1px solid #999;
          }
        }
      }
      .input-pas{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        .input-num{
          width: 33.3%;
          height: 2rem;
          border: 1px solid red;
          border-right: none;
          border-bottom: none;
          line-height: 2rem;
          font-size: 0.6rem;
          &:nth-child(3n){
            border-right: 1px solid red;
          }
          &:nth-child(7),&:nth-child(8),&:nth-child(9) {
            border-bottom: 1px solid red;
          }
        }
      }
    }
  }
  .fade-enter,.fade-leave-to{
    transform: translateY(10.5rem);
  }
  .fade-enter-active,.fade-leave-active{
    transition: all .4s ease;
  }
</style>
