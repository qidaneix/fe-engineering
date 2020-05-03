Object.create = function(proto, propertyDes) {
  const F = function() {};
  F.prototype = proto;
  const f = new F();
  Object.defineProperties(f, propertyDes);
  return f;
};
