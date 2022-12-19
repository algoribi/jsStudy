# Set

> 중복되지 않는 유일한 값들의 집합이다.

- 동일한 값을 중복하여 포함할 수 없다.
- 요소 순서에 의미가 없다.
- 인덱스로 요소에 접근할 수 없다.

## 인스턴스 메서드

- add(value) : set에 `value`를 추가하고, 성공 여부를 나타내는 `boolean` 값을 리턴한다.
- delete(value) : set에 `value` 값을 삭제하고, 성공 여부를 나타내는 `boolean` 값을 리턴한다.
- has(value) : `value`의 존재 여부를 나타내는 `boolean` 값을 반환한다.
- clear() : set에 존재하는 모든 요소들을 일괄 삭제하고, 언제나 `undefined`를 반환한다.
- size() : set 객체의 요소 개수를 반환한다.
- isEmpty() : set 객체가 비어있는지에 관해 `boolean` 값으로 반환한다.
- values() : set 객체에 대해 배열타입으로 반환한다.

- 인덱스 오퍼레이터

https://jinchuu1391.tistory.com/52
