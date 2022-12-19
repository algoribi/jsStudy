class MySet {
    constructor(items) {
        this.items = [];
        this.items = items;
    }
    has(element) {
        return Object.prototype.hasOwnProperty.call(this.items, element);
    }
    add(element) {
        // if (!this.has(element)) {
        //   this.items[element] = element;
        //   return true;
        // }
        // return false;
    }
}
const mySet = new Set();
mySet.add("B");
mySet.add("A");
mySet.add("1");
mySet.add("C");
console.log(mySet);
