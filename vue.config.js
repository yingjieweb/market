module.exports = {
    configureWebpack:{
        resolve:{/*给路径配置别名*/
            'assets':'@/assets',
            'common':'@/common',
            'components':'@/components',
            'network':'@/network',
        }
    }
}
