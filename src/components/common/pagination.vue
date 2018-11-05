<!-- author kangdong -->
<template>
  <div class='pagination'>
    <ul class="cFloat">
      <li :class="{nodrop: currentPage === 1}" @click="prev">上一页</li>
      <li class="pages" v-if="totalPages <= 10">
        <ul>
          <li :class="{curr: currentPage === item}" v-for="(item, index) in totalPages" :key="index" @click="toPage(item)">{{item}}</li>
        </ul>
      </li>
      <li class="pages" v-else>
        <ul v-if="currentPage < 7">
          <li :class="{curr: currentPage === item}" v-for="(item, index) in 8" :key="index" @click="toPage(item)">{{item}}</li>
          <li class="pages">...</li>
          <li @click="toPage(totalPages - 1)" :class="{curr: currentPage === totalPages - 1}">{{totalPages - 1}}</li>
          <li @click="toPage(totalPages)" :class="{curr: currentPage === totalPages}">{{totalPages}}</li>
        </ul>
        <ul v-else-if="currentPage > totalPages - 7">
          <li @click="toPage(1)" :class="{curr: currentPage === 1}">1</li>
          <li @click="toPage(2)" :class="{curr: currentPage === 2}">2</li>
          <li class="pages">...</li>
          <li @click="toPage(totalPages - 7 + item)" v-for="(item, index) in 7" :key="index" :class="{curr: currentPage === totalPages - 7 + item}">{{totalPages - 7 + item}}</li>
        </ul>
        <ul v-else>
          <li @click="toPage(1)" :class="{curr: currentPage === 1}">1</li>
          <li @click="toPage(2)" :class="{curr: currentPage === 2}">2</li>
          <li class="pages">...</li>
          <li @click="toPage(currentPage - 3 + item)" v-for="(item, index) in 6" :key="index" :class="{curr: currentPage === currentPage - 3 + item}">{{currentPage - 3 + item}}</li>
          <li class="pages">...</li>
          <li @click="toPage(totalPages - 1)" :class="{curr: currentPage === totalPages - 1}">{{totalPages - 1}}</li>
          <li @click="toPage(totalPages)" :class="{curr: currentPage === totalPages}">{{totalPages}}</li>
        </ul>
      </li>
      <li :class="{nodrop: currentPage === totalPages}" @click="next">下一页</li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentPage: this.currPage
    }
  },

  components: {},

  computed: {},

  mounted () {},

  methods: {
    toPage (page) {
      this.$emit('currPage', page)
      document.body.scrollTop = document.documentElement.scrollTop = 0
    },
    prev () {
      if (this.currentPage !== 1) {
        this.$emit('currPage', this.currentPage - 1)
        document.body.scrollTop = document.documentElement.scrollTop = 0
      }
    },
    next () {
      if (this.currentPage !== this.totalPages) {
        this.$emit('currPage', this.currentPage + 1)
        document.body.scrollTop = document.documentElement.scrollTop = 0
      }
    }
  },

  props: {
    currPage: {
      type: Number,
      default: 1
    },
    totalPages: {
      type: Number,
      default: 10
    },
    pageSize: {
      type: Number,
      default: 10
    },
    totalElements: {
      type: Number,
      default: 100
    }
  },
  watch: {
    currPage (newVal) {
      this.currentPage = newVal
    }
  }
}
</script>
<style lang='scss' scoped>
.pagination {
  height: 94px;
  padding: 30px 20px;
  line-height: 34px;
  text-align: right;
  ul {
    display: inline-block;
    li {
      float: left;
      text-align: center;
      min-width: 24px;
    }
    li:not(.pages) {
      cursor: pointer;
      min-width: 34px;
      padding: 0 10px;
      margin: 0 3px;
      color: #666;
      border: 1px solid #ddd;
      &.curr {
        color: #fff;
        background: #FF287F;
      }
      &:hover {
        color: #fff;
        background: #FF287F;
      }
      &.nodrop {
        cursor: no-drop;
        color: #666;
        background: #eee;
      }
    }
  }
}
</style>