const AntdCustomTheme = require("./examples/ant-design-vue/custom-theme");
module.exports = {

  // 1.更改入口和出口文件名
  pages: {
    index: {
      entry: 'examples/main.js',//修改入口
      template: 'public/index.html',
      filename: 'index.html'
    }

  },
  // 2.扩展 webpack 配置，使 packages 加入编译
  chainWebpack: config => {

    config.module
      .rule('js')
      .include
      .add('/packages/')
      .end()
      .use('babel')
      .loader('babel - loader')
      .tap(options => {
        // 修改它的选项...

        return options
      })
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: AntdCustomTheme,
        javascriptEnabled: true
      },
      css: {

      }
    },
  },
}