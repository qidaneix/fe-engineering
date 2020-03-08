interface Vnode {
  tag: string;
  attr: {
    [key: string]: string;
  };
  text: string | undefined;
  children: Vnode[] | undefined;
}

class Vnode implements Vnode {
  tag: string;
  attr:
    | {
        [key: string]: string;
      }
    | undefined;
  text: string | undefined;
  children: Vnode[] | undefined;
  constructor(
    tag: string,
    attr?: {
      [key: string]: string;
    },
    text?: string,
    children?: Vnode[]
  ) {
    this.tag = tag;
    this.attr = attr;
    this.text = text;
    this.children = children;
  }
}

const vn = new Vnode(
  "p",
  { style: "font-size:10px;color:red;" },
  "hello world"
);

console.log(vn);
