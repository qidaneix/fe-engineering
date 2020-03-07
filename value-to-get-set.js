/**
 * 转换函数，传入引用类型变量
 * @param {*} obj
 */
function convert(obj) {
  if (!obj instanceof Object) {
    // 非引用类型不能转换！
    throw new Error("non-object var cannot be converted.");
  } else {
    judge(obj);
  }

  // 判断变量是数组还是普通对象，作不同流程处理
  function judge(obj) {
    if (Array.isArray(obj)) {
      walkArray(obj);
    } else {
      walkObject(obj);
    }
  }

  // 遍历对象的属性
  function walkObject(obj) {
    Object.keys(obj).forEach(key => {
      let value = obj[key];
      if (Array.isArray(value)) {
        // 判断属性为数组，转到数组流程处理
        walkArray(value);
      } else if (value instanceof Object) {
        // 判断属性为普通对象，递归
        walkObject(value);
      } else {
        // 判断属性为普通数据属性，转换！
        defineReactive(obj, key);
      }
    });
  }

  // 遍历数组的值
  function walkArray(arr) {
    arr.forEach(item => {
      if (Array.isArray(item)) {
        // 判断属性为数组，转到数组流程处理
        walkArray(item);
      } else if (item instanceof Object) {
        // 判断属性为普通对象，递归
        walkObject(item);
      }
      // ！！！此处未对数组中的基本类型值作处理，因为这些值不能转换为访问器属性！！！
    });
  }

  // 数据属性到访问器属性的转换方法
  function defineReactive(obj, key) {
    // 将数据属性值以私有变量的方式保存！
    let value = obj[key];
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: true,
      set(newVal) {
        // 判断是否将基本类型改为引用类型，是，则作转换
        judge(newVal);
        // 设置私有变量值
        value = newVal;
      },
      get() {
        // 返回私有变量
        return value;
      }
    });
  }
}

let foo = {
  a: false,
  b: {
    c: "hello"
  },
  d: [1, 2, { e: "world" }]
};

console.log(foo);
convert(foo);
console.log(foo);

Object.getOwnPropertyDescriptor(foo, "a").value;
Object.getOwnPropertyDescriptor(foo.b, "c").value;

convert(p);

Object.defineProperty(foo, "f", {
  set(newVal) {
    this.a = newVal;
  },
  get() {
    return this.a;
  }
});

foo.f = "hi";
foo.f; // 'hi'
foo.a; // 'hi'
