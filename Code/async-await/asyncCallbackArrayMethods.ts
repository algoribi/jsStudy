export async function asyncMap<T, R>(
    elements: T[],
    mapper: (currentValue: T, index?: number, array?: T[]) => Promise<R>,
    /** 
     * enforce
     *  true : 중간에 비동기가 실패해도(reject) 모든 elements 순회를 이행하도록 하는 옵션.
     *  이 옵션을 사용할 경우 PromiseSettledResult<T> 타입으로 값을 반환한다.
     *  성공한 비동기의 경우 두 번째 인자로 vaule를, 실패한 비동기에 대해서는 reject의 reason을 반환한다.
     * @default false
     */
    enforce? : boolean,
) {
    if (enforce) {
        return await Promise.allSettled(elements.map(mapper));
    }

    return await Promise.all(elements.map(mapper));
}

function isPromiseFulfilledResult<T>(item : any) : item is PromiseFulfilledResult<T> {
    return item.value !== undefined && item.value === true;
}

export async function asyncFilter<T>(
    elements : T[],
    predicate : (currentValue : T, index? : number, array? : T[]) => Promise<boolean>,
    /** 
     * enforce
     *  true : 중간에 비동기가 실패해도(reject) 모든 elements 순회를 이행하도록 하는 옵션.
     *  이 옵션을 사용할 경우 비동기의 실패는 false로 처리하여 element를 반환하지 않는다.
     * @default false
     */
    enforce? : boolean,
) {
    if (enforce) {
        const results = await Promise.allSettled(elements.map(predicate));
        return elements.filter((_, i) => results[i].status === "fulfilled" && isPromiseFulfilledResult(results[i]));
    } else {
        const results : boolean[] = await Promise.all(elements.map(predicate));
        return elements.filter((_, i) => results[i]);
    }
}

export async function asyncForEach<T>(
    elements : T[],
    callback: (currentValue: T, index?: number, array?: T[]) => Promise<void>,
) {
    for (let i = 0; i < elements.length; i++) {
        await callback(elements[i], i, elements);
    }

    return undefined;
}