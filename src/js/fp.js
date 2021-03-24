const L = {};
const Fp = {};

Fp.curry = (f) => (a, ..._) => (_.length ? f(a, ..._) : (..._) => f(a, ..._));

Fp.reduce = Fp.curry((f, iter, acc) => {
  if (acc === undefined) {
    iter = iter[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const v of iter) {
    acc = f(acc, v);
  }
  return acc;
});

Fp.take = Fp.curry((l, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(a);
    if (res.length === l) return res;
  }
  return res;
});

Fp.takeAll = Fp.take(Infinity);

Fp.go = (...args) => Fp.reduce((a, f) => f(a), args);
Fp.go1 = (...args) => Fp.reduce((a, f) => (a instanceof Promise ? a.then(f) : f(a)), args);

Fp.pipe = (fn, ...fns) => (...as) => Fp.go1(fn(...as), ...fns);

L.range = function* (num) {
  let i = -1;
  while (++i < num) {
    yield i;
  }
};

L.map = Fp.curry(function* (f, iter) {
  for (const a of iter) yield f(a);
});

L.filter = Fp.curry(function* (f, iter) {
  for (const a of iter) {
    if (f(a)) yield a;
  }
});

Fp.map = Fp.curry(Fp.pipe(L.map, Fp.takeAll));

Fp.filter = Fp.curry(Fp.pipe(L.filter, Fp.takeAll));

Fp.range = (start, stop, step = 1) => {
  const arr = [];
  let i = stop ? start : 0;
  stop = stop || start;
  while (i < stop) {
    arr.push(i);
    i += step;
  }
  return arr;
};

Fp.join = Fp.curry((sep = ',', list) => Fp.reduce((pre, val) => pre + sep + val, list));

export { L, Fp };
