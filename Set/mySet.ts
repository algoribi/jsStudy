class MySet {
  private items : { [key : string] : string};

  constructor() {
    this.items = {};
  }

  add(element : string) {
    if (!this.has(element)) {
      this.items[element] = element;
      return true;
    }
    return false;
  }

  delete(element : string) {
    if (this.has(element)) {
      delete this.items[element];
      return true;
    }
    return false;
  }

  has(element : string) {
    return Object.prototype.hasOwnProperty.call(this.items, element);
  }

  values() {
    return Object.values(this.items);
  }

  isEmpty() {
    return this.size() === 0;
  }

  size() {
    return Object.keys(this.items).length;
  }

  clear() {
    this.items = {};
  }

  iterate() {
    
  }
}

// const test = new MySet<string>();
// test.add("hello");
// test.add("test");
// test.add("world");

const t = new Set<string>();
const tt = new MySet();
tt.add("hello");
tt.add("hello");
tt.add("world");

console.log("test : ", t);
// console.log(t["string"]);

// const tt = test.values();
// console.log(test);