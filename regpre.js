const arr = [
  "https://cdn.xxxx.com/static/a.js",
  "https://cdn.xxxx.com/static/d.js",
  "https://cdn.xxxx.com/static/b.css",
  "https://cdn.xxxx.com/static/c.css"
];
const js = /^.+\.js$/;
const css = /^.+\.css$/;

console.log(js.test(arr[0]));
console.log(arr[1].search(js));
console.log(css.test(arr[2]));
console.log(arr[3].search(css));
