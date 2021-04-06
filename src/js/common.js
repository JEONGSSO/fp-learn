const qs = (selector, parent = document) => parent.querySelector(selector);
const qsa = (selector, parent = document) => parent.querySelectorAll(selector);
const onEvent = (event, el, fn) => el.addEventListener(event, fn);

const containerEl = qs('.container');
const todoListEl = qs('.todoList');
const inputEl = qs('.todoInput');
const addBtnEl = qs('.addWrap .btn', qs('.container'));

const fetchData = (url, options = {}) => window.fetch(url, options).then((res) => res.json());
const fetchOptions = (method) => {
  return {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };
};

export { qs, qsa, onEvent, fetchData, fetchOptions, containerEl, todoListEl, inputEl, addBtnEl };
