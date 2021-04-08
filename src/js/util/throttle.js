export default (fn, delay) => {
  let procId;
  return (...args) => {
    if (procId) return;
    procId = setTimeout(() => {
      fn(...args);
      procId = null;
    }, delay);
  };
};
