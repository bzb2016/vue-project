<template>
  <div class="page" key="connet">
    <LoadMore :loadMoreFn="loadMore" @getList="getList">
      <div class="product-list" v-for="(item,index) of list" :key="index">{{item}}</div>
    </LoadMore>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      list: [],
      page: 1
    }
  },
  created () {

  },
  components: {

  },
  mounted () {

  },
  methods: {
    async loadMore (page) {
       console.log('>>>',page)
       let filter= (item) =>{
         return item*10
       }
       let promise = new Promise((resolve,reject) => {
         resolve({
          totalElements: 50,
          list: [1,2,3,4,5,6],
          filter
        })
       })
       return promise
    },
    getList (data) {
      console.log(data)
      this.list = data
    }
  }
}
</script>

<style scoped lang="scss">
  .product-list{
    height: 200px;
    width: 100%;
    border:1px solid brown;
  }
</style>
