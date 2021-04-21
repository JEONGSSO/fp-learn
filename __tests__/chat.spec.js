const fetchData = (url, options = {}) => window.fetch(url, options).then((res) => res.json());

describe('learn Fp', () => {
  // let res;
  // let template;
  // let removeBtnEl;
  // let addBtnEl;

  // beforeEach(async () => {
  //   res = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
  //   removeBtnEl = qs('.btn.remove');
  //   addBtnEl = qs('.btn.add');
  // });

  it('test', async () => {
    expect(true).toBe(true);
  });
});
