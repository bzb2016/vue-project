import Pagination from './pagination'
import LoadMore from './loadMore'
import Address from './address'
import notFind from './notFound'
import Loading from './loading'

let globalTemp = {
  install (Vue) {
    Vue.component('Pagination', Pagination)
    Vue.component('LoadMore', LoadMore)
    Vue.component('Address', Address)
    Vue.component('notFind', notFind)
    Vue.component('Loading', Loading)
  }
}
export default globalTemp