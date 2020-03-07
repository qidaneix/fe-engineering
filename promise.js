class Promise {
  callbacks = [];
  state = "padding"; // padding,resolved,rejected
  value = null;

  constructor(fn) {
    fn(this._resolve.bind(this), this._reject.bind(this)); // 精妙世无双
  }

  then(resolvedCallback, rejectedCallback) {
    return new Promise((resolve, reject) => {
      this._handle({
        resolvedCallback,
        rejectedCallback,
        resolve,
        reject
      });
    });
  }

  catch(rejectedCallback) {
    return this.then(null, rejectedCallback);
  }

  then(callback) {
    return this.then(callback, callback);
  }

  _handle(arg) {
    if (this.state === "padding") {
      this.callbacks.push(arg);
      return;
    }

    let callback =
      this.state === "resolved" ? arg.resolvedCallback : arg.rejectedCallback;
    if (!callback) {
      callback = this.state === "resolved" ? arg.resolve : arg.reject;
      callback(this.value);
      return;
    }

    let result;
    try {
      result = callback(this.value);
      callback =
        this.state === "fulfilled" ? callback.resolve : callback.reject;
    } catch (error) {
      result = error;
      callback = callback.reject;
    } finally {
      callback(result);
    }
  }

  _resolve(value) {
    if (this.state === "padding") {
      this.state = "resolved";
      this.value = value;
      this.callbacks.forEach(arg => this._handle(arg));
    }
  }

  _reject(value) {
    if (this.state === "padding") {
      this.state = "rejected";
      this.value = value;
      this.callbacks.forEach(arg => this._handle(arg));
    }
  }

  static resolve() {}

  static reject() {}

  static all() {}

  static race() {}
}

let p = new newPromise(resolve => {
  setTimeout(() => {
    resolve("hi");
  }, 3000);
});

p.then(value => {
  console.log(value);
}).then(value => {
  console.log(value);
});

Promise.all = function(arr) {
  if (Array.isArray(arr)) {
    throw new TypeError("array is accepted.");
  }
  let flag = 0;
  let resArr = new Array(arr.length);
  return new Promise((resolve, reject) => {
    arr.forEach((item, index) => {
      if (!item instanceof Promise) {
        flag++;
        resArr[index] = item;
        if (flag === arr.length) {
          resolve(resArr);
        }
      } else {
        item.then(
          resolved => {
            flag++;
            resArr[index] = resolved;
            if (flag === arr.length) {
              resolve(resArr);
            }
          },
          rejected => {
            reject(rejected);
          }
        );
      }
    });
  });
};

Promise.allFail = function(arr) {
  if (Array.isArray(arr)) {
    throw new TypeError("array is accepted.");
  }
  let flag = 0;
  let resArr = new Array(arr.length);
  return new Promise((resolve, reject) => {
    arr.forEach((item, index) => {
      if (!item instanceof Promise) {
        resolve(item);
      } else {
        item.then(
          resolved => {
            resolve(resolved);
          },
          rejected => {
            flag++;
            resArr[index] = rejected;
            if (flag === arr.length) {
              reject(resArr);
            }
          }
        );
      }
    });
  });
};

Promise.race = function(arr) {
  if (Array.isArray(arr)) {
    throw new TypeError("array is accepted.");
  }
  return new Promise((resolve, reject) => {
    arr.forEach(item => {
      if (!item instanceof Promise) {
        resolve(item);
      } else {
        item.then(
          resolved => {
            resolve(resolved);
          },
          rejected => {
            reject(rejected);
          }
        );
      }
    });
  });
};
