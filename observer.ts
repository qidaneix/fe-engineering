let ob = {
  map: {},
  emit(eventName, info) {
    const events = Object.keys(ob.map);
    if (events.includes(eventName)) {
      ob.map[eventName].call(window, info);
    } else {
      throw new Error("事件尚未注册");
    }
  },
  on(eventName, cb) {
    ob.map[eventName] = cb;
  }
};

ob.on("hello", function(info) {
  console.log(info);
});

ob.emit("hello", "world");
