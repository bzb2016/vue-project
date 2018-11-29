import Pagination from './pagination'
import LoadMore from './loadMore'
import Address from './address'
import notFind from './notFound'
import Loading from './loading'
import AMap from './map'
import PawInput from  './pawInput'

let globalTemp = {
  install (Vue) {
    Vue.component('Pagination', Pagination)
    Vue.component('LoadMore', LoadMore)
    Vue.component('Address', Address)
    Vue.component('notFind', notFind)
    Vue.component('Loading', Loading)
    Vue.component('AMap', AMap)
    Vue.component('PawInput', PawInput)
  }
}
export default globalTemp