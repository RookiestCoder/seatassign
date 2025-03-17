const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    entry: path.resolve(__dirname, 'src/main.js'), // 指定入口文件
    output: {
      filename: 'seatassign.js', // 输出的文件名
      library: 'SeatAssign', // 库的全局变量名
      libraryTarget: 'umd', // 通用模块定义（支持 CommonJS、AMD 和全局变量）
      umdNamedDefine: true, // 为 UMD 模块命名
    },
    optimization: {
      splitChunks: false, // 禁用代码分割，确保只有一个文件
    },
  },
})