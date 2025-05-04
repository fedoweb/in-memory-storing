export default class Data {
  constructor(data) {
    this.data = data;
    this.generator = this.keyGenerator();
  }

  sort(sortValue) {
    const sortData = [...this.data];
    return sortData.sort((item1, item2) => {
      const value1 = item1[sortValue];
      const value2 = item2[sortValue];

      return ((value1 < value2) ? -1 : ((value1 > value2) ? 1 : 0));
    });
  }

  getKeys() {
    return Object.keys(this.data[0]);
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

  getNextKey() {
    return this.generator.next();
  }
}