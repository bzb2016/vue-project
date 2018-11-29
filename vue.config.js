
/**
 * vue.config.js 是一个可选的配置文件，如果项目的 (和 package.json 同级的) 根目录中存在这个文件，那么它会被 @vue/cli-service 自动加载。
 * vue.config.js 配置会覆盖home目录下一个叫.vuerc的JSON文件配置
 */
module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'?'./':'/mobile/',
  outputDir: 'dist', // 打包输出的文件夹
  assetsDir: 'static', // 相对于outputDir 打包输出img,js,css静态资源存放的文件夹dist/static*
  indexPath: 'index.html', // 生产index.html存放的文件夹 dist/index.hmtl
  lintOnSave: process.env.NODE_ENV !== 'production', // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码。这个值会在 @vue/cli-plugin-eslint 被安装之后生效。
  transpileDependencies: [], //默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来
  productionSourceMap: false, //如果你不需要生产环境的 source map，作用：打包（打包后的代码是加密）错误方便查看具体的哪一行，可以将其设置为 false 以加速生产环境构建。
  // 插件配置
  css: {
    modules: true,
    extract: false, // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中(默认：生产环境下是 true，开发环境下是 false)
    sourceMap: false//是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能。
  },
  
  //设置接口代理（解决请求跨域问题）
  devServer: {
    // host: '0.0.0.0', // 设置主机域名
    // port: 8082, // 端口
    open: true,
    https: false,
    hotOnly: true
  //   proxy: { // 设置代理
  //     '/api': {
        // 目标API地址（就是要访问的接口处的域名如： http://192.168.6.163:8080/）
        // target: 'http://192.168.6.163:8080/',
        //如果代理websockets
        // ws: true,
        // 将主机标头的原点更改为目标URL
        // changeOrigin: true,
        // pathRewrite: {
          // '^/api': ''
        // }
      // }
    // }
  }
}