import Vue from 'vue'

// 打开页面input[type='text']标签自动获取光标自定义指令v-focus
Vue.directive('focus', {
  inserted: function (el) {
    console.log(el)
    el.focus()
  }
})

// 长按监听指令
Vue.directive('longpress', {
  bind: function (el, binding, vNode) {
    console.log(el)
    console.log(binding, 22)
    console.log(vNode, 11)
    // 确保提供的表达式是函数
    if (typeof binding.value !== 'function') {
      // 获取组件名称
      const componentName = vNode.context.name
      let warn = `[longpress:] provided expression '${binding.expression}' is not a function, but has to be `;
      if (componentName) { warn += `Found in component '${componentName}' `}
      console.warn(warn);
    }
    // 定义变量
    let pressTimer = null
    // 定义函数处理程序
    //创建计时器（1s 后执行函数）
    let start = (e) => {
      if (e.type === 'click' && e.button !== 0) return
      if (pressTimer === null) {
        pressTimer = setTimeout(() => {
          handler() 
        }, 3000)
      }
    }
    // 核心执行函数
    const handler = () => {
      //传达值给绑定的指令
      binding.value()
    }
    // 定义取消处理程序
    let cancel = (e) => {
      if (pressTimer !== null) {
        clearTimeout(pressTimer)
        pressTimer = null
      }
    }
    
    //按下鼠标键绑定开始启动计时程序
    el.addEventListener('mousedown', start)
    el.addEventListener('touchstart', start)

    // 取消计时器
    el.addEventListener("click", cancel);
    el.addEventListener("mouseout", cancel);
    el.addEventListener("touchend", cancel);
    el.addEventListener("touchcancel", cancel);
  }
})