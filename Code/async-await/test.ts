import { asyncMap, asyncFilter, asyncForEach } from "./asyncCallbackArrayMethods.js";

const sleep = (ms: number) => {
  return new Promise((resolve, _) => setTimeout(resolve, ms));
}

const throwErrorSleep = (ms: number) => {
    if (ms === 1) {
        return new Promise((_, reject) => reject("reject!"));
    }
  return new Promise((resolve, _) => setTimeout(resolve, ms));
}

const asyncMapTest = async () => {

    const arr = [1, 2, 3];

    const mapper1 = async (i: number) => { await sleep(i); return i; };
    const mapper2 = async (i: number) => { await throwErrorSleep(i); return i; };

    // asyncMap
    const mapArray1 = await asyncMap(arr, mapper1);
    console.log(mapArray1); // [ 1, 2, 3]

    // enforce option : true
    const mapArray2 = await asyncMap(arr, mapper2, true);
    console.log(mapArray2);
    // [
    //   { status: 'rejected', reason: 'reject!' },
    //   { status: 'fulfilled', value: 2 },
    //   { status: 'fulfilled', value: 3 }
    // ]
}

const asyncFilterTest = async () => {
  const arr = [1, 2, 3, 4];

  const predicate1 = async (i : number) => { await sleep(i); return i % 2 === 0; };
  const predicate2 = async (i : number) => { await throwErrorSleep(i); return i % 2 === 0; };

  // asyncFilter
  const filterArray1 = await asyncFilter(arr, predicate1);
  console.log(filterArray1); // [2, 4]

  // enforce option : true
  const filterArray2 = await asyncFilter(arr, predicate2, true);
  console.log(filterArray2); // [2, 4]
}

const asyncForEachTest = async () => {

}

// asyncMapTest();
// asyncFilterTest();
asyncForEachTest();
