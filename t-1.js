let str = `http://taobao.com?foo=bar&abc=123#token=xyz`;

function parse(str) {
  // 寻找起始和结束位置
  let preIndex = str.indexOf("?");
  let endIndex = str.indexOf("#");
  if (preIndex === -1 || (endIndex < preIndex && endIndex !== -1)) {
    throw new Error("url中无参数");
  }
  let paramsStr;
  if (endIndex === -1) {
    paramsStr = str.slice(preIndex + 1);
  } else {
    paramsStr = str.slice(preIndex + 1, endIndex);
  }

  let paramsArr = paramsStr.split("&");
  let paramsDeArr = paramsArr.map(item => item.split("="));
  let obj = {};
  paramsDeArr.forEach(item => {
    obj[item[0]] = item[1];
  });
  return obj;
}

parse(str);
