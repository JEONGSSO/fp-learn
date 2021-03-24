import { fetchData, fetchOptions } from './js/common';
import { renderList } from './js/ui';

import '@src/style/main.scss';
renderList(fetchData('https://jsonplaceholder.typicode.com/todos', fetchOptions('get')));
