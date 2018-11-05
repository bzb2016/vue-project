import Vue from "vue";
import axios from "axios";
import store from "../store";
import router from "../route";

console.log(process.env.VUE_APP_BASE_URL)
/**
 * 创建一个axios实例，并且可以自定义其配置
 */
const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  headers: {
    "X-Requested-With": "XMLHttpRequest"
  },
  timeout: 20000
})
 
/**
 * http 请求拦截器
 */
instance.interceptors.request.use(config => {
  // 请求前配置config
  if (store.state.token) {
     // 登录页获取token的字段已变化：data.member.token
     config.headers.token = store.state.token
  }
  store.commit('showLoading', true)
  config.headers["Content-Type"] = "application/json"
  return config
}, error => {
  return Promise.reject(error)
})

/**
 * http 响应拦截器
 */
instance.interceptors.response.use(response => {
  let status = response.status
  let data = response.data
  store.commit('showLoading', false)
  if (status === 200) {
    // 判断成功响应回来的数据，并写出各状态码下该做的操作
       // 1001:token失效，请重新登录，调到登录页面
    if (data.code !== "0" && data.code === "1001") {
      store.commit("setToken", "")
    } else if (data.code !== "0" && data.code === "5000") {
      console.log(data.msg)
    } else if (data.code === "0") {
      console.log(data.msg)
      // 把整个响应参数异步返回给then或catch调用
      return Promise.resolve(response)
    }
  }
}, error => {
  if (error.response) {
    switch(error.response.status) {
      // http response 服务器响应拦截器，这里拦截401错误，并重新跳入登页重新获取token
      case 401:
      // 这里写清除token的代码
      router.replace({
        path: 'login', // 用登录页路由的name属性{path: '/login', name: 'login, component: Login}
        query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
      })
    }
  }
  // 请求接口错误没有找到时会到这来
  return Promise.reject(error)
})

/**
 * 封装get请求
 */
Vue.prototype.$get = async (opt) => {
  let res = await instance.get(opt.url, {
    params: opt.data
  })
  // 请求后再异步返回response.data
  return Promise.resolve(res.data)
}

/**
 * 封装post请求
 */
Vue.prototype.$post = async (opt) => {
  let res = await instance.post(opt.url, opt.data)
  return Promise.resolve(res.data)
}

// 导出http请求方式
export default {
  $get: async (opt) => {
    let res = await instance.get(opt.url, {
      params: opt.data
    })
    return Promise.resolve(res.data)
  },
  $post: async (opt) => {
    let res = await instance.post(opt.url, opt.data)
    return Promise.resolve(res.data)
  }
}