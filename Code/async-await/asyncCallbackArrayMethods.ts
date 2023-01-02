export async function pMap<T, R>(
    elements: T[],
    mapper: (currentValue: T, index?: number, array?: T[]) => Promise<R>,
    /** 
     * enforce
     *  true : 중간에 비동기가 실패해도(reject) 모든 elements 순회를 이행한다.
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

export async function pFilter() {

}

export async function pForEach() {

}