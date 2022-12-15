# Set
> 수학적 집합을 구현하기 위한 자료구조이다.

- 중복값을 허용하지 않는다.
- 원소의 삽입 순서에 의미를 두지 않는다.
- 자동으로 오름/내림 차순으로 정렬된다.

### 언제 사용할까

- 삽입과 동시에 정렬이 필요할 때
- 중복을 제거한 원소의 집합이 필요할 때
- 현재 원소가 중복된 값인지 확인이 필요할 때

### 인스턴스 속성
- size : set 객체의 요소 개수를 return

## 인스턴스 메서드
- add(value) : set에 `value`를 추가한다.
- delete(value) : set에 `value` 값을 삭제하고, 성공 여부를 나타내는 `boolean` 값을 리턴한다.
- has(value) : `value`의 존재 여부를 나타내는 `boolean` 값을 반환한다.
- clear() : set에 존재하는 모든 요소들을 일괄 삭제하고, 언제나 `undefined`를 반환한다.
- forEach() 

- 인덱스 오퍼레이터

https://jinchuu1391.tistory.com/52