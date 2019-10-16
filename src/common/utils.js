export function debounce(func,delay){ //防抖动函数
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this,args)
    },delay)
  }
}

export function formatDate(date, fmt) {
  //1.获取年份
  //y+：1个或多个y，y*：0个或者多个y，y?：0个或者1个y
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }

  //2.这些东西不和y放到一起，因为y有四位，而且如果这些两位数是个为数，需要补上0
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero (str) {  //如果是一位，用0作为补齐
  return ('00' + str).substr(str.length);
};
