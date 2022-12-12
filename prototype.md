# prototype, getPrototypeOf, __proto__

상속은 객체지향 프로그래밍의 핵심 개념으로, 어떤 객체의 프로퍼티 또는 메서드를 다른 객체가 그대로 사용할 수 있는 것을 말한다. <br />
JS의 클래스는 프로토타입을 기반으로 상속을 구현하여, 새로운 클래스 몇 개를 만들든 프로토타입을 통해 상속받은 프로퍼티들을 그대로 사용할 수 있어 불필요한 중복을 막을 수 있다. <br />

### 프로토타입(prototype) 객체
> 다른 객체에 공유 프로퍼티를 제공하는 객체이다.

JS의 모든 객체는 [[Prototype]]이라는 내부 슬롯을 갖고 있다.<br />
하지만 [[Prototype]]이라는 내부 슬롯에는 직접 접근이 불가능하다. 이는 프로토타입 체인의 단방향을 지키기 위해서다.<br />
따라서 `__proto__` 프로퍼티 혹은 `Object.getPrototypeOf()`를 통해서만 접근할 수 있다.<br />

### __proto__와 getPrototypeOf

모든 객체는 `__proto__`를 통해 자신의 프로토타입([[Prototype]])에 접근할 수 있다.<br />
`__proto__`는 ES6 이전까지 비표준 메커니즘이었으나, ES6에서 표준으로 채택되었다.<br />
하지만 여전히 코드 내에서 `__proto__`를 직접 호출하기 보다는 `Object.getPrototypeOf()`를 통해 프로토 타입에 접근하는 것을 권장한다. <br />
이에 대해서는 뒷장에서 자세히 다뤄볼 예정이다.<br />

### prototype 프로퍼티
> 생성자 함수로 호출할 수 있는 객체, 즉 constructor를 소유하는 프로퍼티이다.

일반 객체와 생성자 함수로 호출할 수 없는 non-constructor에서는 `prototype` 프로퍼티가 없다.<br />
또한 화살표 함수도 non-constructor로 `prototype` 프로퍼티가 없다.

```
// 함수 객체는 prototype 프로퍼티가 있다.
function func() {}
func.hasOwnProperty('prototype'); // output: true

// 일반 객체는 prototype 프로퍼티가 없다.
const obj = {};
obj.hasOwnProperty('prototype'); // output: false

// 화살표 함수 또한 prototype 프로퍼티가 없다.
const arrowFunc = () => {};
arrowFunc.hasOwnProperty('prototype'); // output: false
```

생성자 함수에 의해 생성된 객체는 constructor 프로퍼티를 통해 생성자 함수와 연결된다.

```
function Person(name) {
  this.name = name;
}
const me = new Person('Mike'); // Person 생성자로 만들어진 me 객체
me.constructor === Person; // output: true
```
즉, 프로토타입과 생성자 함수는 늘 함께 존재한다는 것을 알 수 있다. <br />


