export default class Table {
  constructor(data) {
    this.data = data;
    this.table = null;
  }

  init(data = this.data) {
    this.createTable();
    this.createHeaders(this.getHeaders());
    this.createBody(data);
  }

  createTable() {
    const container = document.querySelector('.table_container');
    container.innerHTML = '';

    this.table = document.createElement('table');

    container.appendChild(this.table);
  }

  createHeaders(headers) {
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr'); 

    headers.forEach(header => {
      const th = document.createElement('th');
      th.textContent = header;
      th.classList.add('table_header_th');
      headerRow.appendChild(th);
    });

    this.table.appendChild(thead);
    thead.appendChild(headerRow);
    
  }

  createBody(data) {
    const tbody = document.createElement('tbody');

    data.forEach(element => {
      const row = document.createElement('tr');

      for (let key in element) {
        const cell = document.createElement('td');
        
        if(key === 'imdb') {
          cell.textContent = `imbd: ${element[key].toFixed(2)}`;
        } else if (key === 'year') {
          cell.textContent = `(${element[key]})`;
        } else {
          cell.textContent = element[key];
        }
        
        cell.classList.add('table_body_td');
        row.appendChild(cell);
      };

      tbody.appendChild(row);
    });

    this.table.appendChild(tbody);
  } 

  getHeaders() {
    return Object.keys(this.data[0]);
  }

  addArrow(key, sortType) {
    const thead = document.querySelector('thead');
    const headers = Array.from(thead.querySelectorAll('th'));

    headers.forEach(element => {
      element.innerHTML = element.innerHTML.replace(/↑|↓/, '');

      if (element.textContent === key && sortType === 'abc') {
        element.textContent += '↓';
      } else if (element.textContent === key && sortType === 'cba') {
        element.textContent += '↑';
      }
    });
  }
}