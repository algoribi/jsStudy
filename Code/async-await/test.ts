import { pMap, pFilter, pForEach } from "./asyncCallbackArrayMethods.js";

const sleep = (ms: number) => {
  return new Promise((resolve, _) => setTimeout(resolve, ms));
}

const throwErrorSleep = (ms: number) => {
    if (ms === 1) {
        return new Promise((_, reject) => reject("reject!"));
    }
  return new Promise((resolve, _) => setTimeout(resolve, ms));
}

const test = async () => {

    const arr = [1, 2, 3];

    const mapper1 = async (i: number) => { await sleep(i); return i; };
    const mapper2 = async (i: number) => { await throwErrorSleep(i); return i; };

    // pMap
    const mapArray1 = await pMap(arr, mapper1);
    console.log(mapArray1); // [ 1, 2, 3]

    // enforce option : true
    const mapArray2 = await pMap(arr, mapper2, true);
    console.log(mapArray2);
    // [
    //   { status: 'rejected', reason: 'reject!' },
    //   { status: 'fulfilled', value: 2 },
    //   { status: 'fulfilled', value: 3 }
    // ]
}

test();