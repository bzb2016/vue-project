import Vue from 'vue'

// 对value进行过滤 => 小数点后保留两位有限数字
Vue.filter('currency', (value) => Number(value).toFixed(2) || '')