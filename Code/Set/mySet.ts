export interface IMySet<T> {
  size: number;
  add(element: T): void;
  tryAdd(element: T): boolean;
  delete(element: T): void;
  tryDelete(element: T): boolean;
  has(element: T): boolean;
  clear(): void;
  isEmpty(): boolean;
  values(): T[];

  [Symbol.iterator](): Iterator<T>;

  union(setB: MySet<T>): MySet<T>;
  intersection(setB: MySet<T>): MySet<T>;
  difference(setB: MySet<T>): MySet<T>;
  subSet(setB: MySet<T>): boolean;
}

export class MySet<T> implements IMySet<T> {
  private items: T[] = [];
  public size: number = 0;

  constructor(element?: T | T[]) {
    if (element) {
      if (element instanceof Array) {
        for (const item of element) {
          this.add(item);
        }
      } else {
        this.add(element);
      }
    }
  }

  add(element: T) {
    if (!this.has(element)) {
      const newItems = [...this.items, element];
      this.items = newItems;
      this.size++;
    }
  }

  tryAdd(element: T) {
    if (!this.has(element)) {
      const newItems = [...this.items, element];
      this.items = newItems;
      this.size++;
      return true;
    }
    return false;
  }

  delete(element: T) {
    const idx = this.items.indexOf(element);
    if (idx > -1) {
      const newItems = [...this.items.slice(0, idx), ...this.items.slice(idx)];
      this.items = newItems;
      this.size--;
    }
  }

  tryDelete(element: T) {
    const idx = this.items.indexOf(element);
    if (idx > -1) {
      const newItems = [...this.items.slice(0, idx), ...this.items.slice(idx)];
      this.items = newItems;
      this.size--;
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
    this.size = 0;
  }

  isEmpty() {
    if (this.items.length === 0) {
      return true;
    }
    return false;
  }

  values() {
    return this.items;
  }

  [Symbol.iterator]() {
    let idx = -1;
    return {
      next: () => {
        idx++;
        return {
          value: this.items[idx],
          done: idx >= this.size,
        };
      },
    };
  }

  union(setB: MySet<T>) {
    // 합집합
    const union = new MySet<T>(this.items);
    for (const item of setB) {
      union.add(item);
    }
    return union;
  }

  intersection(setB: MySet<T>) {
    // 교집합
    const intersection = new MySet<T>();
    for (const item of setB) {
      if (this.has(item)) {
        intersection.add(item);
      }
    }
    return intersection;
  }

  difference(setB: MySet<T>) {
    // 차집합
    const difference = new MySet<T>(this.items);
    for (const item of setB) {
      difference.delete(item);
    }
    return difference;
  }

  subSet(setB: MySet<T>) {
    // 부분집합 : this가 setB의 부분집합인지 확인
    if (this.size > setB.size) {
      return false;
    }

    for (const item of this.items) {
      if (!setB.has(item)) {
        return false;
      }
    }
    return true;
  }
}