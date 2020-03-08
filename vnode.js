var Vnode = /** @class */ (function () {
    function Vnode(tag, attr, text, children) {
        this.tag = tag;
        this.attr = attr;
        this.text = text;
        this.children = children;
    }
    return Vnode;
}());
var vn = new Vnode("p", { style: "font-size:10px;color:red;" }, "hello world");
console.log(vn);
