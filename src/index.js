import { fetchData, fetchOptions } from './js/common';
import { initList } from './js/ui';

import '@src/style/main.scss';

initList(fetchData('https://jsonplaceholder.typicode.com/todos', fetchOptions('get')));
