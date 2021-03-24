import { qs, fetchData, todoListEl } from '@src/js/common';
import { makeHtmlString, appendHtml } from '@src/js/ui';

describe('learn Fp', () => {
  let res;
  let template;
  let removeBtnEl;
  let addBtnEl;

  beforeEach(async () => {
    res = await fetchData();
    removeBtnEl = qs('.btn.remove');
    addBtnEl = qs('.btn.add');
  });

  it('init fetch data length', () => {
    expect(res[0]).toEqual({
      id: 1,
      title: '굿',
      done: false,
    });
  });

  it('make append Template', async () => {
    template = makeHtmlString(res);
    appendHtml(todoListEl, template);
    expect(todoListEl.children.length).toBe(3);
  });

  it('remove Item', () => {
    removeBtnEl.click();
    expect(todoListEl.children.length).toBe(2);
  }, 100);

  it('add Item', () => {
    addBtnEl.click();
    expect(todoListEl.children.length).toBe(3);
  }, 300);
});
