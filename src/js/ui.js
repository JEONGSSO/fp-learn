import { L, Fp } from './fp';
import {
  qs,
  qsa,
  onEvent,
  containerEl,
  todoListEl,
  addBtnEl,
  inputEl,
  footerEl,
} from './common.js';
import intersectionOb from './util/intersectionOb';

const makeHtml = Fp.curry((f, iter) => Fp.reduce(f, iter, ''));
const appendHtml = Fp.curry((target, html) => target.insertAdjacentHTML('afterbegin', html));
const render = Fp.curry((makeFn, targetEl) => Fp.pipe(makeHtml(makeFn), appendHtml(targetEl)));

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

const addItem = ({ target }) => {
  if (target.tagName !== 'BUTTON') return;
  if (!inputEl.value) return;

  const data = [
    {
      id: 3,
      title: inputEl.value,
      done: false,
    },
  ];
  Fp.go1(data, render(listMaker, todoListEl));
  inputEl.value = '';
};

const removeItem = ({ target }) => {
  if (target.tagName !== 'BUTTON') return;
  todoListEl.removeChild(target.closest('.item'));
};

onEvent('click', todoListEl, removeItem);
onEvent('click', addBtnEl, addItem);

const lastChild = () => qs('li:last-child', todoListEl);

const fetchMore = (data) => {
  Fp.go1(data, render(listMaker, todoListEl));
};

const observerFn = (entries) => {
  if (!todoListEl.childElementCount) return;
  entries.forEach((entry) => {
    entry.isIntersecting && fetchMore(Fp.range(2));
  });
};

const options = {
  threshold: 0.1,
};

const moreObserver = intersectionOb(observerFn, options);

const initList = (data, limit = 10) => Fp.go1(data, Fp.take(limit), render(listMaker, todoListEl));

export { makeHtml, appendHtml, initList };
