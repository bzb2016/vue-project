
const HelloWorld = r => require.ensure([], () => r(require("./../components/HelloWorld")), "HelloWorld")
const Login = r => require.ensure([], () => r(require("./../views/login/Login")), "Login")
const About = r => require.ensure([], () => r(require("./../views/About")), "About")
const Product = r => require.ensure([], () => r(require("./../views/Product")), "Product")
const ProductDetail = r => require.ensure([], () => r(require("./../views/ProductDetail")), "ProductDetail")
const Connect = r => require.ensure([], () => r(require("./../views/Connect")), "Connect")
const Vuescroll = r => require.ensure([], () => r(require("./../views/Vuescroll")), "Vuescroll") 


let routes = [
  {
    path: "/",
    name: "home",
    component: HelloWorld
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/about",
    name: "about",
    component: About,
    meta:{
      requireAuth: true
    }
  },
  {
    path: "/product",
    name: "product",
    component: Product,
    meta:{
      requireAuth: true
    }
  },
  {
    path: "/connect",
    name: "connect",
    component: Connect,
    meta:{
      requireAuth: true
    }
  },
  {
    path: "/vuescroll",
    name: "vuescroll",
    component: Vuescroll,
    meta:{
      requireAuth: true
    }
  },
  {
    path: "/productDetail",
    name: "productdetail",
    component: ProductDetail,
    meta:{
      requireAuth: true
    }
  }
];
export default routes;
