import { L, Fp } from './fp';
import { onEvent, containerEl, todoListEl, addBtnEl, inputEl } from './common.js';

const makeHtml = Fp.curry((f, iter) => Fp.reduce(f, iter, ''));
const appendHtml = Fp.curry((target, html) => target.insertAdjacentHTML('beforeend', html));
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

const boxHtml = (item) => `
  <div>
    <p>${item}</p>
  </div>
`;
const boxMaker = templateMaker(boxHtml);

const boxInit = (data) => Fp.go1(data, render(boxMaker, containerEl));

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

onEvent('DOMContentLoaded', window, () => boxInit(Fp.range(5)));

const initList = (data, limit = 10) => Fp.go1(data, Fp.take(limit), render(listMaker, todoListEl));

export { makeHtml, appendHtml, initList };
