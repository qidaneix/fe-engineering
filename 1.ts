const d = document.querySelector(".btnWrap");
const b = document.querySelector(".btn");
// 函数声明
d.addEventListener(
  "click",
  function(fuck) {
    console.log(this);
    // fuck.stopPropagation();
    fuck.preventDefault();
    console.log(fuck.defaultPrevented);
  },
  false
);
b.addEventListener(
  "click",
  function(fuck) {
    console.log(this);
    console.log(fuck.defaultPrevented);
    // fuck.stopPropagation();
  },
  false
);
