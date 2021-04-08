export default (fn, delay) => {
  let procId = null;
  return (...args) => {
    procId && window.clearTimeout(procId);
    procId = setTimeout(() => fn(...args), delay);
  };
};
