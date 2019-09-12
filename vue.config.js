module.exports = {
  configureWebpack:{
    resolve:{/*给路径配置别名*/
      alias:{
        'assets':'@/assets',
          'common':'@/common',
          'components':'@/components',
        'network':'@/network',
      }
    }
  }
}
