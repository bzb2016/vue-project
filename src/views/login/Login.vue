<template>
  <div class="page">
    <div class="login-box">
      <img src="./../../assets/image/picture/am_logo.png" alt="">
    </div>
    <div class="login-content">
      <div class="line username">
        <input type="text" v-model="username" placeholder="请输入手机号/账号">
      </div>
      <div class="line password">
        <input type="password" v-model="password" placeholder="请输入密码" @keyup.enter="login">
      </div>
      <div class="login-btn">
         <input type="button" value="登录" :class="{'active': password && username}" @click="login">
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import md5 from 'js-md5'
export default {
  data () {
    return {
      username: '',
      password: ''
    }  
  },
  created () {

  },
  components: {

  },
  mounted () {

  },
  methods: {
    async login () {
      if (!(this.username && this.password)) {
         alert('请输入密码或账号！')
         return
      }
      let self = this
      let data = {
        loginName: this.username,
        name: this.username,
        password: md5(this.password + 'cnbbx')
      }
      this.$post({
        url: '/seller/login/v2',
        data: data
      }).then(res => {
        self.$store.commit('setToken', res.data.token)
        if (self.$route.query.redirect) {
          self.$router.replace(self.$route.query.redirect)
        } else {
          self.$router.replace({
            path: 'home'
          })
        }
        console.log(res)
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .page{
    width:100%;
    padding: 0 .15rem;
    .login-box{
      margin: 0 auto;
      padding: 1.5rem 0;
      width: 4rem;
      img{
        display: block;
        width: 100%;
        height: 100%;
        background: #FF0D6E
      }
    }
    .login-content{
      .line{
        padding: 0.15rem 0;
        border-bottom: 1px solid #BBBBBB;
        input{
          width: 100%;
          height: 1rem;
        }
      }
      .login-btn{
        margin-top: 1rem;
        input[type=button]{
          width: 90%;
          height: 1.1rem;
          border-radius: 50px;
          border: none;
          outline: none;
          color: #fff;
          font-size: .45rem;
          -webkit-outline: none;
        }
        .active{
          background: #FF0D6E;
        }
      }
    }
  }
</style>
