class MySet<T> {
  private items: T[];

  constructor(items?: T[]) {
    if (items === undefined) {
      this.items = [];
    } else {
    this.items = items;
    }
  }

  add(element : T) {
    if (!this.has(element)) {
      this.items.push(element);
      return true;
    }
    return false;
  }

  delete(element: T) {
    const idx = this.items.indexOf(element);
    if (idx > -1) {
      this.items.splice(idx, 1);
      return true;
    }
    return false;
  }

  has(element: T) {
    if (this.items.indexOf(element) > -1) {
      return true;
    }
    return false;
  }

  clear() {
    this.items = [];
    return undefined;
  }

  size() {
    return this.items.length;
  }
  
  isEmpty() {
    if (this.items.length === 0) {
      return true;
    }
    return false;
  }

  values() {
    return Array.from(this.items);
  }
}

const test = new MySet<string>();
test.add("hello");
test.add("test");
test.add("world");

const tt = test.values();
console.log(test);