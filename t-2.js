function tree(arr) {
  function findChildren(children) {
    children.forEach(item => {
      item.children = arr.filter(itemIn => itemIn.parent === item.id);
      if (item.children.length) {
        findChildren(item.children);
      }
    });
  }
  const newArr = arr.filter(itemIn => itemIn.parent === null);
  findChildren(newArr);
  return newArr;
}

tree(val);
