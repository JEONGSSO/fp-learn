import { L, Fp } from './fp';
import { onEvent, todoListEl, addBtnEl, inputEl } from './common.js';

const makeHtmlString = (list) =>
  Fp.reduce(
    (pre, item) =>
      pre +
      `
      <li class="item ${item.completed ? 'done' : ''}">
        <label for="select_${item.id}">
          <input type="checkbox" name="done" id="select_${item.id}" />
          <span>${item.title}</span>
        </label>
        <button class="btn remove">X</button>
      </li>
    `,
    list,
    ''
  );

const appendHtml = Fp.curry((target, html) => target.insertAdjacentHTML('beforeend', html));

const renderList = (data) => {
  Fp.go1(data, Fp.take(9), makeHtmlString, appendHtml(todoListEl));
};

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
  Fp.go1(data, makeHtmlString, appendHtml(todoListEl));
  inputEl.value = '';
};

const removeItem = ({ target }) => {
  if (target.tagName !== 'BUTTON') return;
  todoListEl.removeChild(target.closest('.item'));
};

onEvent('click', todoListEl, removeItem);
onEvent('click', addBtnEl, addItem);

export { makeHtmlString, appendHtml, renderList };
