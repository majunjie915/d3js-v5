module.exports = {
  publicPath: './',
  outputDir: 'dish',
  assetsDir: '',
  indexPath: 'index.html',
  filenameHashing: true,
  pages: {
    index: {
      // page 的入口
      entry: 'src/modules/page1/index.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Index Page',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['index']
    },
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `public/subpage.html`
    // 并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `subpage.html`。
    page2: 'src/modules/page2/index.js',
    page3: 'src/modules/page3/index.js',
    page4: 'src/modules/page4/index.js',
    page5: 'src/modules/page5/index.js',
    page6: 'src/modules/page6/index.js',
  },
  devServer: {
    // 通过设置让浏览器 overlay 显示 eslint 的检测警告
    overlay: {
      warnings: true,
      errors: false
    },
    proxy: {
      '/api': {
        target: '<url>',
        ws: true,
        changeOrigin: true
      },
      '/foo': {
        target: '<other_url>'
      }
    }
  },
  // 生产构建时不进行 selint 检测
  lintOnSave: process.env.NODE_ENV !== 'production',
  // 是否使用包含运行时编译器的 Vue 构建版本,运用的话项目会大10kb
  runtimeCompiler: false,
  // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来
  transpileDependencies: [],
  productionSourceMap: false,
  // 设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性
  // 需要注意的是该选项仅影响由 html-webpack-plugin 在构建时注入的标签 - 直接写在模版 (public/index.html) 中的标签不受影响
  crossorigin: undefined,
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        // 修改它的选项...
        return options
      })
  },
  css: {
    // 向 CSS 相关的 loader 传递选项
    loaderOptions: {
      css: { // 这里的选项会传递给 css-loader
        localIdentName: '[name]-[hash]',
        camelCase: 'only'
      },
      // 给 sass-loader 传递选项
      sass: { // 这里的选项会传递给 sass-loader
        data: ''
      }
    },
    // 提取 CSS 在开发环境模式下是默认不开启的，因为它和 CSS 热重载不兼容。然而，你仍然可以将这个值显性地设置为 true 在所有情况下都强制提取
    extract: true,
    sourceMap: false
  },
  pluginOptions: {
      
  }
}