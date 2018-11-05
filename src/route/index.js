import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import store from "../store";

Vue.use(VueRouter)

let router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: routes,
  scrollBehavior (to, from, savePosition) {
    if (savePosition) {
      return savePosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})

const history = window.sessionStorage;
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)
router.beforeEach ((to, form, next) => {
  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(form.path)
  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.commit('setDirect', {
        direction: 'forward'
      })
    } else {
      store.commit('setDirect', {
        direction: 'reverse'
      })
    }
  } else {
    ++historyCount;
    history.setItem('count', historyCount);
    to.path !== '/' && history.setItem(to.path, historyCount);
    store.commit('setDirect', {
      direction: 'forward'
    })
  }
  // 先判断进入的页面是否要权限（requireAuth），如果是true,则进人判断是否登录，没有登录则进入登录页面
  const authRequired = to.matched.some((route) => route.meta.requireAuth)
  // 判断跳转目标页面是否要权限：不需要权限就跳转
  if (!authRequired) return next()
  // 目标页面需要权限，在判断是否已登录，如没有登录这跳转到登录页面，否则就跳目标页面
  if (authRequired) {
    if(!store.state.token) {
      redirectToLogin()
    } else {
      next()
    }
  }
  function redirectToLogin () {
    // 要在登录页判断redirect是否有值，ture的话就跳转回to.fullPath页面，没有这跳首页
    next({name: 'login', query:{redirect: to.fullPath}})
  }
})
export default router