module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport":{
      viewportWidth:375,//视窗的宽度，对应的是设计稿的宽度(750 retina高清屏->1点有两个像素)。
      viewportHeight:667,//视窗的高度，对应的是设计稿的高度，（也可以不配置）。一般都是iPhone6(750*1334)设计稿
      unitPrecision:5,//指定'px'转换为视窗单位值的小数位数（很多时候无法整除）
      viewportUnit:'vw',//指定需要转换成的视窗单位，建议使用vw
      selectorBlackList:['ignore','tab-bar','tab-bar-item'],//指定不需要转换的类,不希望哪个类做转化，给他添加一个ignore类名即可
      minPixelValue:1,//小于或等于'1px'不转换为视窗单位。
      mediaQuery:false,//允许在媒体查询中转换'px'
      exclude:[/TabBar/]//指定不需要转换的文件，格式是正则表达式（按照排除的文件写对应的正则）。在js中写正则：/正则相关规则/
    }
  }
}
