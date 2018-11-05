<template>
  <div class="page">
    <!-- <button type="button" @click="showAddress">选择下拉地址</button> -->
    <!-- <Address :isShowAddress="isShowAddress" @closeAddress="closeAddress"></Address>   -->
    <div class="box">
      <div class="item">1</div>
      <div class="item">2</div>
      <div class="item">3</div>
      <div class="item">4</div>
      <div class="item">5</div>
      <div class="item">6</div>
      <div class="item">7</div>
      <div class="item">8</div>
      <div class="item">9</div>
      <div class="item">10</div>
    </div>
    <section>
      <div class="content">
        <div>
          <button type="button" @click="loginout">退出</button>
          <p>{{token}}</p>
        </div>
        <div>
          <router-link to="/vuescroll">vuescroll</router-link>
        </div>
        <div>
           <router-link to="/product">product</router-link>
        </div>
        <div><router-link to="/productdetail" class="ml10">productdetail</router-link></div>
      </div>
      <div>
        {{day}}
      </div>
    </section>
    <footer class="footer">
      <div class="foot">
        <input type="text">
      </div>
    </footer>
  </div> 
</template>

<script>

export default {
  name: "HelloWorld",
  data () {
    return {
      isShowAddress: false,
      token: this.$store.state.token,
      day: null,
      hh: null,
      mm: null,
      ss: null
    }
  },
  mounted () {
    let time = '2018-11-4 22:10:10'
    // let day = this.fn.getCountDownTime(time, 1, 3)
  },
  methods: {
    showAddress () {
      this.isShowAddress = true
    },
    closeAddress (data) {
      this.isShowAddress = data
    },
    loginout () {
      this.$store.commit('setToken', false)
      if (!this.$store.state.token) {
        this.$router.replace({
          path: 'login'
        })
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.page{
  .ml10{margin-left: 10px;}
  .box{
    display: -webkit-flex;
    display: flex;
    flex-direction: row; // 默认
    flex-wrap: wrap; // 默认
    justify-content: space-around;
    .item{
      align-items: flex-start;
      margin-top: 10px;
      border: 1px solid red;
      width: 18%;
      height: 100px;
      line-height: 100px;
    }
  }
  .content{
    width: 100%;
    height: 13rem;
    border: 1px solid red;
    a{
      font-size: 50px;
    }
  }
  .footer{
    position: fixed;
    width: 100%;
    bottom:0;
    left:0;
    input{
      width: 80%;
      height: 0.8rem;
    }
  }
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
}
</style>
