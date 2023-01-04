# 이벤트 큐를 I/O에 블로킹시키지 마라

JS는 단 하나의 Stack 공간을 가지고 있는 싱글스레드 언어이다.<br />
브라우저는 코드를 한 줄씩 읽어 이 스택 공간에 한 줄씩 올린다. <br />
이때, API요청, 이벤트 리스너, setTimeout 등과 같이 작업이 오래 걸리는 코드는 계속 스택 공간을 차지하고 있는 대신, 개발자가 시스템 콜백을 등록해서 값이 도착하면 이벤트 큐에 들어가도록 되어있다. 그리고 이벤트 큐에 들어간 결과 값은 스택이 비어 있을 때 스택 공간으로 올라와서 실행된다. <br />

## Blocking I/O

Blocking I/O에 대해 책에서는 동기식 I/O라고 표현했다.<br />
이는 즉, I/O연산이 완료되기 전까지 스택을 점유하고 기다리겠다는 뜻이며, 이렇게 된다면 사용자는 이 작업이 완료될 동안 웹페이지와 그 어떤 상호작용도 할 수 없을 것이다.<br />
즉, 싱글스레드 언어인 JS에서는 많은 비용이 드는 연산의 처리를 뒤로 미루고, 연산이 끝났을 때 결과를 처리할 수 있는 비동기 방식을 사용해야 한다.<br />

- 비동기 API는 많은 비용이 드는 연산의 처리를 뒤로 미루기 위해 콜백을 받아서 메인 애플리케이션의 블로킹을 막는다.
- JS는 이벤트를 동시에 받아들이지만 이벤트 핸들러는 이벤트 큐를 사용해 순서대로 처리한다.
- 애플리케이션의 이벤트 큐에서는 절대 블로킹 I/O를 사용하지 마라.

<br />

# 비동기 시퀀스를 위해 감싸지거나 이름이 지정된 콜백을 사용하라

우리는 종종 비동기 작업들이 순차적으로 진행돼야 하는 상황을 만난다.<br />
예를 들면 비동기식 데이터베이스에서 어떤 URL을 찾고, 해당 URL의 내용을 다운로드해야 하는 경우는 어떻게 해야 할까?<br />

```
db.lookupAsync("url", function(url) { / ... / });
downloadAsync(url, function(text) { / ... / }); // 오류 : url이 바인딩되지 않음
```

이 경우 downloadAsync의 인자로 데이터베이스를 탐색해서 얻은 URL이 필요한데, 이 값이 해당 스코프에 없기 때문에 이 코드는 제대로 동작할 수 없다.<br />
그리고 또 다른 이유가 있는데, downloadAsync를 실행해도 데이터베이스 탐색의 결과 값이 아직 사용 가능하지 않기 때문이다. <br />

가장 쉬운 해결 방법은 감싸는 것이다.<br />

```
db.lookupAsync("url", function(url) {
    downloadAsync(url, function(text) {
        / ... /
    });
});
```

이렇듯 두 번째 동작을 첫 번째 함수의 콜백으로 넘겨주면 손쉽게 순차적으로 수행이 가능해진다.<br />
비동기 연산을 감싸는 방법은 쉽다. 하지만 더 긴 시퀀스로 확장해 가면 금세 거추장스러워진다.<br />

```
db.lookupAsync("url", function(url) {
    downloadAsync(url, function(text) {
        downloadAsync("a.txt", function(text) {
            downloadAsync("b.txt", function(text) {
                downloadAsync("c.txt", function(text) {
                    / ... /
                });
            });
        });
    });
});
```

이러한 코드를 **콜백 지옥**이라고 한다.<br />

그리고 사실 위의 코드는 url을 얻어온 후로 "a.txt", "b.txt", "c.txt"의 경우 이미 우리가 받아야 할 파일의 이름을 알고 있다.<br />
이처럼 우리가 다운로드할 파일 이름의 목록을 가지고 있다면 다음 파일을 요청하기 전에 이전 파일의 다운로드가 완료되기를 기다릴 필요가 없을 것이다.<br />
따라서 위의 코드는 다음과 같이 수정이 가능하다.<br />

```
db.lookupAsync("url", downloadFiles);
function downloadFiles(url, file) {
    downloadAllAsync(["a.txt", "b.txt", "c.txt"], function(all) {
        var a = all[0], b = all[1], c = all[2];
        / ... /
    });
}
```

- 여러 개의 비동기 연산을 순서대로 수행하기 위해 감싸진 콜백이나 이름이 지정된 콜백 함수를 사용하라.
- 동시에 실행될 수 있는 연산을 순차 실행하지 마라.

<br />

# 오류를 놓치지 않도록 조심하라

비동기 프로그래밍의 어려운 점 중 하나는 바로 에러 처리다.<br />
동기적인 코드에서는 try 블록으로 코드의 일부를 감싸서 오류를 한 번에 처리하기가 쉽다.<br />
하지만 비동기적인 코드에서는 여러 단계의 프로세스가 주로 이벤트 큐의 별도의 턴으로 나누어지기 때문에 하나의 try 블록으로 모두를 감싸기가 불가능하다.<br />
대신, 비동기 API는 콜백의 특수 인자로써 오류를 오류를 표현하거나, 추가적인 오류 처리 콜백 함수를 받아들인다.<br />
지난 62장에서 봤던 비동기 API 예제에 오류 처리 콜백을 넣으면 다음과 같은 모양이 된다.<br />

```
downloadAllAsync(["a.txt", "b.txt", "c.txt"], function(all) {
    / ... /
}, function (error) {
    / ... /
});
```

비동기 API의 경우 실행 단계 중 오류 처리를 제공하는 것을 깜빡하기 쉽다. 이로 인해 흔히 오류를 아무런 소리 없이 조용히 놓쳐버리게 된다.<br />
오류를 무시하는 프로그램은 사용자에게 매우 실망스러운 경험을 준다. 유사하게, 조용한 오류를 디버그 하는 것 또한 위험하다.<br />
문제의 원인에 대한 어떠한 단서도 제공하지 않기 때문이다.<br />
따라서 비동기 API를 다룰 때는 모든 오류 조건을 명시적으로 처리하는지 항상 경계하고 확인해야 한다.<br />

<br />

# 비동기적인 반복문을 위해 재귀를 사용하라

URL의 배열을 받고, 한 번에 하나씩 하나의 다운로드가 완료되고 나면 다음 URL을 다운로드하는 함수가 있다고 가정해 보자.<br />
만약 API가 **동기식**이라면 반복문으로 간단하게 구현할 수 있을 것이다.<br />
하지만 이런 방법은 **비동기식**에서는 제대로 동작하지 않는데, 콜백 안에서 반복문을 일시정지시키고 다시 반복하게 할 수 없기 때문이다.<br />
만약 반복문을 사용한다면 다음 다운로드를 시도하기 전에 이전의 다운로드를 기다리지 않고, 모든 다운로드를 초기화하게 될 것이다.<br />

이런 비동기 처리를 위해 반복문대신 재귀를 사용할 수 있다. 재귀는 재귀 호출리 리턴되기 전까지 작업을 완료할 수 없다. <br />
사실 이런 점 때문에 동기적인 코드라면, 마지막 재귀가 불릴 때까지 호출 스택에 결과값들이 쌓이게 된다. 이게 많아지면 스택 공간보다 값이 더 많아져서 오류를 뱉는데, 이것이 바로 스택 오버플로우다. <br />
이런 이유로 JS의 경우 대략 만 번 정도의 재귀가 가능하며, 다른 언어들 또한 십만 번 이하로 가능하다.<br />
하지만 JS의 비동기의 경우 앞선 장에서 알아봤듯이 스택공간에서 빼뒀다가 콜백을 통해 결과값을 받게 되면 이벤트큐에 그 값이 들어가 다시 스택공간으로 올라오게 된다.<br />
따라서 비동기의 경우 호출 스택을 오버플로우 하지 않으며, 이런 이유로 재귀를 이용할 것을 권장한다.<br />