export default class Data {
  constructor(data) {
    this.data = data;
    this.generator = this.keyGenerator();
  }

  sort(key, sortType) {
    const sortData = [...this.data];
    return sortData.sort((item1, item2) => {
      let value1 = item1[key];
      let value2 = item2[key];

      if (key === 'id' || key === 'year' || key === 'imbd') {
        value1 = parseFloat(value1);
        value2 = parseFloat(value2);  
      }

      if (sortType === 'abc') return ((value1 < value2) ? -1 : ((value1 > value2) ? 1 : 0));
      if (sortType === 'cba') return ((value1 > value2) ? -1 : ((value1 < value2) ? 1 : 0));
    });
  }

  keyGenerator() {
    const keys = this.getKeys();
    let index = 0;
    
    return {
      next: () => {
        const key = keys[index % keys.length];
        index++;
        return key;
      },
      reset: () => {
        index = 0;
      }
    };
  }

  getKeys() {
    return Object.keys(this.data[0]);
  }

  getNextKey() {
    return this.generator.next();
  }
}