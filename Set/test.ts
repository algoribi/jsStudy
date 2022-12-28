import { MySet } from "./mySet.js";

const test = () => {
  const setA = new MySet<string>(); // setA []

  setA.add("hello"); // setA ["hello"]
  console.log(setA.tryAdd("test")); // true // setA [ "hello", "test" ] 

  setA.values(); // [ "hello", "test" ]
  console.log(setA.size) // 2

  console.log(setA.has("world")); // false

  setA.delete("hello"); // setA [ "test" ]
  console.log(setA.tryDelete("world")); // false // setA [ "test" ]
  console.log(setA.size) // 1

  setA.clear() // setA []
  setA.isEmpty() // true

  const setB = new MySet<number>([1, 2, 3]); // setB [ 1, 2, 3 ]
  console.log(...setB); // 1, 2, 3
  for (const i of setB) { // 1 2 3
    console.log(i);
  }

  const setC = new MySet<number>([2, 3, 4, 5, 6]); // setC [ 2, 3, 4, 5, 6 ]
  const unionSet = setB.union(setC); // unionSet [ 1, 2, 3, 4, 5, 6 ]
  const intersectionSet = setB.intersection(setC); // intersectionSet [ 2, 3 ]
  const differenceSet = setB.difference(setC); // differenceSet [ 1 ]
  console.log(setB.subSet(setC)); // false
}

test();