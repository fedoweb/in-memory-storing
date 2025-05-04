export default class Table {
  constructor(data) {
    this.data = data;
    this.table = null;
  }

  createTable() {
    const container = document.querySelector('.table_container');

    this.table = document.createElement('table');
    this.table.classList.add('table');

    this.createHeaders(this.getHeaders());
    this.createBody(this.data);

    container.appendChild(this.table);
  }

  createHeaders(headers) {
    const thead = document.createElement('thead');
    thead.classList.add('table_header');
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
    tbody.classList.add('table_body');

    data.forEach(element => {
      const row = document.createElement('tr');
      row.classList.add('table_body_row');
      
      for (let key in element) {
        row.setAttribute(`data-${key}`, element[key]);

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

  sortTable(sortValue, sortType) {
    const tbody = document.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));

    rows.sort((item1, item2) => {
     
      let value1 = item1.getAttribute(`data-${sortValue}`);
      let value2 = item2.getAttribute(`data-${sortValue}`);

      if (sortValue === 'id'
        || sortValue === 'year' 
        || sortValue === 'imbd') {
          
        value1 = parseFloat(value1);
        value2 = parseFloat(value2);
      }

      if (sortType === 'abc') return ((value1 < value2) ? -1 : ((value1 > value2) ? 1 : 0));

      if (sortType === 'cba') return ((value1 > value2) ? -1 : ((value1 < value2) ? 1 : 0));
    });

    tbody.innerHTML = '';

    rows.forEach(row => tbody.appendChild(row));
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