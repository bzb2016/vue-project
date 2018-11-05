<template>
  <transition name="adressAnimate">
    <div class="address" v-show="isShowAddress">
      <section class="title">
        <h4>居住地址</h4>
        <span @click="closeAdd()">X</span>
      </section>
      <section class="nav">
        <div class="area" @click="provinceSelected" :class="Province?'':'active'">{{Province?Province: '请选择'}}</div>
        <div class="area" @click="citySelected" :class="City?'':'active'" v-show="Province">{{City?City:'请选择'}}</div>
        <div class="area" @click="districtSelected" :class="District?'':'active'" v-show="City">{{District?District:'请选择'}}</div>
      </section>
      <ul>
        <li class="addList" v-for="(item,index) of showProvinceList" :key="item.areaId" @click="getProvinceId(item.areaId, item.areaName, index)" v-show="showProvince" :class="item.selected ? 'active' : ''">{{item.areaName}}</li>
        <li class="addList" v-for="(item,index) of showCityList" :key="item.areaId" @click="getCityId(item.areaId, item.areaName, index)" v-show="showCity" :class="item.selected ? 'active' : ''">{{item.areaName}}</li>
        <li class="addList" v-for="(item,index) of showDistrictList" :key="item.areaId" @click="getDistrictId(item.areaId, item.areaName, index)" v-show="showDistrict" :class="item.selected ? 'active' : ''">{{item.areaName}}</li>
      </ul>
    </div> 
  </transition>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      showProvince: false,
      hasInitProvince: true, // 判断是否有默认省份
      showCity: false,
      hasInitCity: true, // 判断是否有默认城市
      showDistrict: false,
      showProvinceList: [],
      showCityList: [],
      showDistrictList: [],
      District: '',
      Province: '',
      City: '',
      // v-for循环判断是否为当前
      selected: false,
      province: '',
      city: '',
      district: ''
    };
  },
  props: {
    isShowAddress: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  mounted() {
    this.getProvinceList()
  },
  methods: {
    // 获取省份showProvinceList
    async getProvinceList () {
      let self = this
      this.$get({
        url: '/address/get/0'
      }).then(res => {
        if(res.code === '0') {
          let content = res.data
          if (self.Province && self.hasInitProvince) {
            for(let i = 0; i < content.length; i++) {
              if (content[i].areaName === self.Province) {
                self.province = content[i].areaId
              }
            }
          } else {
            self.showProvinceList = res.data
          }
        }
      })
    },
    closeAdd: function() {
      // this.isShowAddress = false;
      this.$emit('closeAddress', false)
    },
    getProvinceId: function(code, input, index) {
      this.province = code;
      this.Province = input;
      this.showProvince = false;
      this.showCity = true;
      this.showDistrict = false;
       
    },
    provinceSelected: function() {
      // 清除市级和区级列表
      this.hasInitProvince = false;
      this.showCityList = false;
      this.showDistrictList = false;
      // 清除市级和区级选项
      this.City = false;
      this.District = false;
      // 选项页面的切换
      this.showProvince = true;
      this.showCity = false;
      this.showDistrict = false;
      this.getProvinceList()
    },
    // 获取城市列表getCityList
    async getCityList(id) {
      let self = this
      this.$get({
        url: `/address/get/${id}`
      }).then(res => {
        if(res.code === '0') {
          let content = res.data
          if (self.City && self.hasInitCity) {
            for(let i = 0; i < content.length; i++) {
              if (content[i].areaName === self.City) {
                self.city = content[i].areaId
              }
            }
          } else {
            self.showProvinceList = res.data
          }
          self.showCityList = res.data
        }
      })
    }, 
    getCityId: function(code, input, index) {
      this.city = code;
      this.City = input;
      this.showProvince = false;
      this.showCity = false;
    },
    citySelected: function() {
      this.hasInitCity = false
      this.showProvince = false;
      this.showCity = true;
      this.showDistrict = false;
      this.District = false
      this.getCityList(this.province)
    },
    // 获取县区列表getDistrictList
    async getDistrictList(id) {
      let self = this
      this.$get({
        url: `/address/get/${id}`
      }).then(res => {
        
        if(res.code === '0') {
          self.showDistrictList = res.data
        }
      })
    }, 
    getDistrictId: function(code, input, index) {
      this.district = code;
      this.District = input;
      this.showDistrict = false;
      // this.showChose = false;
    },
    districtSelected: function() {
      this.showProvince = false;
      this.showCity = false;
      this.showDistrict = true;
      this.getDistrictList(this.city)
    }
  }
};
</script>

<style scoped lang="scss">
  .address {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 121;
    // transform: translateY(2rem);
    width: 100%;
    height:800px; 
    color: #333;
    background: #fff;
    .title{
      text-align: center;
      h4{
        display: inline-block;
        font-size: 32px;
        line-height: 100px;
        font-weight: normal;
        color: #999;
      }
      span{
        position: absolute;
        display: inline-block;
        right: 30px;
        top: 10px;
        font-size: 28px;
        line-height: 68px;
        color: #d8d8d8;
      }
    }
    .nav{
      text-align: left;
      .area {
        // width: 30%;
        display: inline-block;
        font-size: 28px;
        margin-left: 80px;
        color: #333;
        &:first-child{
          margin-left: 40px;
        }
      }
      .active {
        color: #0071b8;
        border-bottom: 0.02rem solid #0071b8;
      }
    }
    ul{
      margin-top: 40px;
      width: 100%;
      height: 600px;
      overflow: auto;
      li {
        text-align: left;
        padding-left: 5%;
        height: 40px;
        line-height: 40px;
      }
      .addList {
        width: 40%;
        // padding-left: 0.32rem;
        font-size: 24px;
        color: #333;
      }
      .active {
        color: #0071b8;
      }
    }
  }
</style>
<style>
  .adressAnimate-enter-active,.adressAnimate-leave-active{
    transition: 1s all ease;
  }
  .adressAnimate-enter-active{
    transform: translateY(0)
  }
  .adressAnimate-leave-active{
    transform: translateY(800px)
  }
  .adressAnimate-enter,.adressAnimate-leave{
    transform: translateY(800px)
  }
</style>

