const path = require('path');
module.exports = {
  // 基本路径
  publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
  // 输出文件目录
  outputDir: process.env.NODE_ENV === 'production' ? 'dist' : 'devdist',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  /** vue3.0内置了webpack所有东西，
   * webpack配置,see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
   **/
  chainWebpack: (config) => {
    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
        include: ["./src/icons"]
      });
  },
  configureWebpack: (config) => {
    config.resolve = { // 配置解析别名
      extensions: ['.js', '.json', '.vue'], // 自动添加文件名后缀
      alias: {
        'vue': 'vue/dist/vue.js',
        '@': path.resolve(__dirname, './src'),//以@代表/src路径
        '@c': path.resolve(__dirname, './src/components')
      }
    }
  },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      sass: {
        data: `@import "./src/styles/main.scss";`
      }
    },
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require('os').cpus().length > 1,
  /**
   *  PWA 插件相关配置,see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
   */
  pwa: {},
  // webpack-dev-server 相关配置
  devServer: {
    open: false, // 编译完成是否打开网页
    host: '0.0.0.0', // 指定使用地址，默认localhost,0.0.0.0代表可以被外界访问
    port: 8080, // 访问端口
    https: false, // 编译失败时刷新页面
    hot: true, // 开启热加载
    hotOnly: false,
    // 配置跨域  设置代理
  
    proxy: {
      //  所有地址后缀都加  /devApi
      '/devApi': {
        target: "http://old.web-jshtml.cn/vue_admin_api", //要访问的API服务器的地址 http://old.web-jshtml.cn/vue_admin_api
        changeOrigin: true,
        pathRewrite: {
          '^/devApi': ''  //查找以/devApi开头的api 查找到就替换为空的 其实就是request.js中的BASEURL
        }
      }
    },
     // 在浏览器看来访问的/devApi，是localhost:8080这个ip和端口的服务,符合同源策略，所以浏览器并不会认为这是跨域。
    // 实际上，服务器在拦截到带有/devApi/后，会将访问前缀更换为指定目标【target】，实际时访问的是 http://old.web-jshtml.cn/vue_admin_api


    overlay: { // 全屏模式下是否显示脚本错误
      warnings: true,
      errors: true
    },
    before: app => {}
  },
  /**
   * 第三方插件配置
   */
  pluginOptions: {}
}