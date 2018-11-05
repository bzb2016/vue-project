<template>
  <div class="list">
     <slot></slot>
     <p class="loadTip">{{loading}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      list: [],
      totalPages: 1,
      page: 1,
      limit: 10,
      totalElements: 0,
      loading: ''
    }
  },
  props: {
    loadMoreFn: {
      type: Function,
      default: ()=>{
        return function () {}
      }
    },

  },
  created () {
    this.initList() 
  },
  mounted () {
    window.onscroll = this.scrollUploadList
  },
  methods: {
    /**
     * 初始化父组件传给子组件的函数
     */
    initLoadMoreFn () {
      let self = this
      this.loadMoreFn().then((res) => {
        // console.log(res)
        self.totalElements = res.totalElements
        self.totalPages = Math.ceil(res.totalElements/self.limit)
        if (Array.isArray(res.list) && res.list.length > 0) {
          console.log(res.list)
          self.pushToList(res.list, res.filter)
        } else {
          alert('数据不是一个数组！')
        }
      })
    },
    /**
     * 下拉加载更多
     */
    loadMore () {
      this.page++
      console.log(this.page)
    },
    /**
     * 是否加载更多
     */
    isLoadMore () {
      // 获取滚动条当前的位置
      function getScrollTop () {
        let scrollTop = 0
        if (document.documentElement && document.documentElement.scrollTop) {
          scrollTop = document.documentElement.scrollTop
        } else {
          scrollTop = document.body.scrollTop
        }
        return scrollTop
      } 
      // 获取可视区域的高度
      function getClientHeight () {
        let clientHeight = 0
        if (document.body.clientHeight && document.documentElement.clientHeight) {
          clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight)
        } else {
          clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight)
        }
        return clientHeight
      }
       // 获取文档完整的高度
      function getScrollHeight () {
        return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
      }
      // console.log(getScrollTop(), getClientHeight(), getScrollHeight())
      return getScrollTop() + getClientHeight() === getScrollHeight()
    },
    /**
     * 滚动加载数据
     */
    scrollUploadList () {
      this.loading = ''
      if (this.isLoadMore()) {
        if(this.totalElements > this.limit && this.totalPages > this.page) {
          this.loading = '加载更多...'
          setTimeout(() => {
            this.loadMore()
          }, 1000)
        } else if (this.totalElements > this.limit && this.totalPages <= this.page) {
          this.loading = '全部数据加载完成'
        }
      }
    },
     /**
     * 推送到list中 因为vue的监听特性 只能用push进行数据的添加 如果有特殊处理 通过传递一个filter来过滤数据
     * @param list
     * @param filter
     */
    pushToList (list, filter) {
      list.forEach((item) => {
        if(typeof filter === 'function') {
          this.list.push(filter(item))
        } else {
          this.list.push(item)
        }
      })
      this.$emit('getList', this.list)
    },
    /**
     * 初始化列表
     */
    initList () {
      this.page = 1
      this.list = []
      this.initLoadMoreFn()
    }
  },
  watch: {
    page: 'initLoadMoreFn'
  }
}
</script>

<style scoped lang="scss">
.loading{
  height: 100px;
  text-align: center;
  line-height: 50px;
}
</style>
