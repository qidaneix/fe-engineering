Function.prototype.bind = function() {
  let _this = arguments[0];
  let funThis = this;
  return function() {
    funThis.apply(_this);
  };
};
