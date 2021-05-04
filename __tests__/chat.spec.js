const fetch = require('node-fetch');

describe('learn Fp', () => {
  let res;
  const fetchData = (url, options = {}) => fetch(url, options).then((res) => res.json());

  beforeEach(async () => {
    res = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
  });

  it('fetch test', async () => {
    expect(res).toEqual({ userId: 1, id: 1, title: 'delectus aut autem', completed: false });
  });
});
