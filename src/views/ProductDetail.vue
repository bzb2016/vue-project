<template>
  <div class="page">
     <div class="demo" id="demo">
       <div class="small-box" id="small-box" @mouseover="enterbox()" @mouseout="leavebox()">
         <div class="mark" id="mark" @mousemove="movebox"></div>
         <div class="float-box" id="float-box"></div>
         <img src="./../assets/image/picture/bg-activity.png" alt="">
       </div>
       <div class="big-box" id="big-box">
         <img src="./../assets/image/picture/bg-activity.png" alt="">
       </div>
     </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      objDemo: null,
      objSmallBox: null,
      objMarkBox: null,
      objFloatBox: null,
      objBigBox: null,
      objBigBoxImg: null
    }
  },
  created () {

  },
  components: {

  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      //找六个个元素：demo，smallBox,foatBox,mark,bigfloatBox,imgs,
      this.objDemo=document.getElementById("demo");
      this.objSmallBox=document.getElementById("small-box");
      this.objMarkBox=document.getElementById("mark");
      this.objFloatBox=document.getElementById("float-box");
      this.objBigBox=document.getElementById("big-box");
      this.objBigBoxImg=this.objBigBox.getElementsByTagName("img")[0];
    },
    enterbox () {
      this.objFloatBox.style.display="block";
      this.objBigBox.style.display="block";
    },
    leavebox () {
      this.objFloatBox.style.display="none";
      this.objBigBox.style.display="none";
    },
    movebox (e) {
      let _event = e || window.event; 
      //1计算值：
      let left=_event.clientX-this.objDemo.offsetLeft-this.objSmallBox.offsetLeft-this.objFloatBox.offsetWidth/2;
      let top=_event.clientY-this.objDemo.offsetTop-this.objSmallBox.offsetTop-this.objFloatBox.offsetHeight/2;
      //5.优化，在前面加判断,不让其溢出，加判断
      if(left<0) left=0;
      if(top<0) top=0;
      if(left>this.objSmallBox.offsetWidth-this.objFloatBox.offsetWidth)
              left=this.objSmallBox.offsetWidth-this.objFloatBox.offsetWidth;
      if(top>this.objSmallBox.offsetHeight-this.objFloatBox.offsetHeight)
              top=this.objSmallBox.offsetHeight-this.objFloatBox.offsetHeight;

      //2把值赋值给放大镜
      this.objFloatBox.style.left=left+"px";
      this.objFloatBox.style.top=top+"px";

       //3计算比例
      let percentX=left/(this.objMarkBox.offsetWidth-this.objFloatBox.offsetWidth);
      let percentY=top/(this.objMarkBox.offsetHeight-this.objFloatBox.offsetHeight);

      //4利用这个比例计算距离后赋值给右侧的图片
      this.objBigBoxImg.style.left=-percentX*(this.objBigBoxImg.offsetWidth-this.objBigBox.offsetWidth)+"px";
      this.objBigBoxImg.style.top=-percentY*(this.objBigBoxImg.offsetHeight-this.objBigBox.offsetHeight)+"px";
    }
  }
}
</script>

<style scoped lang="scss">
.page{
  * {
    margin: 0;
    padding: 0
  }
  .demo{
    display: block;
    width: 400px;
    height: 500px;
    margin: 50px;
    position: relative;
    border: 1px solid #ccc;
    .small-box{
      position: absolute;
      z-index: 1;
      &:hover{
        cursor: move;
      }
      .float-box{
        display: none;
        width: 100px;
        height: 100px;
        position: absolute;
        background: #fffccc;
        border:1px solid #ccc;
        filter: alpha(opacity=50);
        opacity: 0.5;
      }
      .mark{
        position: absolute;
        display: block;
        width:400px;
        height: 500px;
        background-color: #fff;
        filter: alpha(opacity=0);/*过滤器，目前只有少数浏览器支持*/
        opacity: 0;
        z-index: 10;
      }
      img{
        display: block;
        width:100%;
      }
    }
    .big-box{
      display: none;
      position: absolute;
      top: 0;
      left: 400px;
      width: 500px;
      height: 600px;
      overflow: hidden;
      border: 1px solid #ccc;
      z-index: 1;
      img{
        position: absolute;
        z-index: 5
      }
    }
  }
}
</style>
