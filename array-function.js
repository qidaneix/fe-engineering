const a = [123, true, "abc", { foo: "bar" }, [1, 2, 3]];

const b = a.concat();

b.every((item, index) => item === a[index]);
