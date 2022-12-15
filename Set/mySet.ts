class MySet {
  constructor() {
    this.items = {};
  }
  has(value) {
    return this.items.hasOwnProperty(value);
    // hasOwnProperty -> 객체가 특정 프로퍼티를 가지고 있는지를 나타내는 불리언 값을 반환한다
  }
  add(value) {
    if (!this.has(value)) {
      this.items[value] = value; // 키 - 값 쌍을 동일하게 저장해야 값을 찾기 편하다
      return true;
    }
    return false;
  }
  remove(value) {
    if (this.has(value)) {
      delete this.items[value];
      return true;
    }
    return false;
  }
  clear() {
    this.items = {};
  }
  size() {
    return Object.keys(this.items).length;
  }
  values() {
    return Object.keys(this.items);
  }
}