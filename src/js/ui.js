import { L, Fp } from './fp';
import {
  qs,
  qsa,
  onEvent,
  fetchData,
  fetchOptions,
  containerEl,
  todoListEl,
  addBtnEl,
  inputEl,
  footerEl,
} from './common.js';
import intersectionOb from './util/intersectionOb';

const makeHtml = Fp.curry((f, iter) => Fp.reduce(f, iter, ''));
const appendHtml = Fp.curry((target, html) => {
  target.insertAdjacentHTML('beforeend', html);
  return target;
});
const render = Fp.curry((makeFn, targetEl) => Fp.pipe(makeHtml(makeFn), appendHtml(targetEl)));

const lastChild = Fp.curry((target, parent) => qs(`${target}:last-child`, parent));

const templateMaker = (template) => (pre, item) => pre + template(item);

const listHtml = (item) => `
  <li class="item ${item.completed ? 'done' : ''}">
    <label for="select_${item.id}">
      <input type="checkbox" name="done" id="select_${item.id}" />
      <span>${item.title}</span>
    </label>
    <button class="btn remove">X</button>
  </li>
`;
const listMaker = templateMaker(listHtml);

const emptyInput = (targetEl) => (targetEl.value = '');

const addItem = ({ type, keyCode }) => {
  if (type === 'keyup' && keyCode !== 13) return;
  if (!inputEl.value) return;

  const data = [
    {
      id: Math.floor(Math.random() * 1000),
      title: inputEl.value,
      done: false,
    },
  ];

  Fp.go1(data, render(listMaker, todoListEl), () => Fp.tap(emptyInput)(inputEl));
};

const removeItem = ({ target }) => {
  if (target.tagName !== 'BUTTON') return;
  todoListEl.removeChild(target.closest('.item'));
};

onEvent('click', todoListEl, removeItem);
onEvent('click', addBtnEl, addItem);
onEvent('keyup', inputEl, addItem);

const fetchMore = (data) => {
  Fp.go1(data, render(listMaker, todoListEl));
};

let todoCount; // side effect
const observerFn = (entries, observer) => {
  const childCount = todoListEl.childElementCount;
  if (!childCount) return;

  entries.forEach(async (entry) => {
    if (entry.isIntersecting) {
      const data = await fetchData(
        `https://jsonplaceholder.typicode.com/todos/${++todoCount}`,
        fetchOptions('get')
      );

      if (!Object.keys(data).length) {
        observer.disconnect();
        return;
      }

      fetchMore([data]);
    }
    observer.unobserve(entry.target);
    observer.observe(lastChild('li', todoListEl));
  });
};

const options = {
  threshold: 0.8,
};

const moreObserver = intersectionOb(observerFn, options);

// QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ

const lastItemObserver = (target) => Fp.pipe(lastChild('li')(target), moreObserver.observe(target));

const initList = async (data, limit = 10) => {
  await Fp.go1(data, Fp.take(limit), render(listMaker, todoListEl), lastItemObserver);
  todoCount = 190;
};

export { makeHtml, appendHtml, initList };
