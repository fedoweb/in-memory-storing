import Table from './Table.js';
import Data from './Data.js'

const inputData = [
  {
    'id': 26,
    'title': 'Побег из Шоушенка',
    'imdb': 9.30,
    'year': 1994
  },
  {
    'id': 25,
    'title': 'Крёстный отец',
    'imdb': 9.20,
    'year': 1972
  },
  {
    'id': 27,
    'title': 'Крёстный отец 2',
    'imdb': 9.00,
    'year': 1974
  },
  {
    'id': 1047,
    'title': 'Тёмный рыцарь',
    'imdb': 9.00,
    'year': 2008
  },
  {
    'id': 223,
    'title': 'Криминальное чтиво',
    'imdb': 8.90,
    'year': 1994
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const data = new Data(inputData);
  
  const table = new Table(data.data);
  table.createTable();
  
  let count = 0;
  let sortType;
  let key;

  setInterval(() => {
    if (count % 2 === 0) {
      key = data.getNextKey();
      sortType = 'abc';
    } else {
      sortType = 'cba';
    }
    
    table.sortTable(key, sortType);
    table.addArrow(key, sortType);

    count++;
  }, 3000);
});
