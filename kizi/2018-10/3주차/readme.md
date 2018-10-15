# Tag Document


# SCSS Document

## Scss Seletor

```
<h1>hello
  <span class="son">world</span>
</h1>

<style>
  h1{
    color:blue;
    .son{
      color:red;
    }
  }

</style>
```
기본적으로 css와 셀렉하는게 같으나, 위와 같이 중첩해서 css를 작성할 수 있다.

```
.entry-content {
  p { font-size: 9.814rem; }
}

// compiled to
.entry-content p {
  font-size: 9.814rem;
}
```
특정 선택자 내에는 속성 정의만 들어오는 것이 아니라, nested된 속성 정의 블럭이 들어올 수 있다.


```
.entry-content {
  p {
    font: {
      family: "Noto Serif CJK KR", serif;
      size: 9.814rem;
      weight: 400;
    }
  }
}
```
선택자가 네스팅되는 것과 유사하게, 특정한 family로 묶여있는 속성들도 네스팅이 가능하다. 예를 들어 font의 경우 font-family, font-size, font-weight 등이 주로 세트로 정의되는데, 다음과 같이 하나의 세트(?)인 속성들은 속성의 하위 사전 형태로 작성할 수 있다.




## 상위요소 참조
```
a {
  text-decoration: none
  &:hover { text-decroation: underline; }
}
```

&을 사용하면 현재 블럭이 적용되는 셀렉터를 참조한다. 정확하게는 참조가 아닌 치환이다.  특히 현재 속성을 설정중인 셀렉터에 의사셀렉터를 적용할 때 유용하다.

위 선언은 아래와 같이 컴파일 된다.

```
a { text-decoration: none; }
a:hover { text-decoratino: underline; }
```

## 또다른 &사용법
```
.widget {
   font-weight: 400;
   &-area { font-weight: 600; }
   &-top_posts { font-weight: 1000; }
}
```
이 & 은 현재 셀렉터로 치환되기 때문에 다음과 같이 복합어로 이루어진 클래스들을 하나의 블럭으로 네스팅하여 묶을 때도 유용하게 쓰일 수 있다. 워드 프레스 테마의 경우를 예로 들면, 위젯들은 모두 widget-**** 의 식으로 클래스 이름을 갖는다.  이 들을 개별 셀렉터로 쓰지 않고 아래처럼 네스팅할 수 있다는 이야기다.

위 예에서 & 은 .widget 으로 치환되므로 컴파일된 결과는 아래와 같다.

```
.widget { font-weight: 400; }
.widget-area { font-weight: 600; }
.widget-top_posts { font-weight: 1000; }
```

## 변수와 연산자
색상이나 선 스타일, 폰트 패밀리등은 대체로 사이트 내에서 공통적으로 정의해놓은 값을 쓰는 경우가 많다. 이들을 매번 지정하지 않고 변수로 들어서 사용하면 변경 시점에 변수의 내용만 수정하여 모든 곳의 값을 공통적으로 바꿀 수 있을 것이다.

| 타입      | 설명 |
|:--------|:--------:|
|숫 자 값     |숫자 리터럴로 쓰인 값은 숫자로 판단한다. 크기를 나타내는 단위가 붙은 경우도 숫자로 취급한다. 12px, 1.534rem|
|문 자 열      |문자의 경우 기본적으로 따옴표 여부에 상관없이 문자열로 취급한다.
|색상값|색상명이나 색상리터럴로 표기된 값은 색으로 인식한다. (blue, #aa33cc, rgba(255, 0, 0, 0.3))|
|불리언|true, false|
|널|null|
|리스트|리스트 내 원소는 동일 타입일 필요는 없으며, 괄호 속에 컴마나 공백으로 구분된 값들을 리스트로 본다.|
|맵|괄호 속에서 : 으로 키 : 값을 구분하여 쓴다.|


## 문자열의 치환 및 내삽(interpolation)

#{...} 을 사용하면 문자열 내에 표현식의 결과를 내삽하거나, 다른 변수의 내용으로 치환하는 것이 가능하다. 이는 속성값의 일부 혹은 전체 뿐만 아니라 속성명이나 셀렉터에 대해서도 적용 가능하다.
```
$foo: bar;
$fontsize: 12px;
$lineheight: 30p;

p {
  font: #{$fontsize}/#{$lineheight};
  &.#{$foo} { color: red; }
}
```

이 예제는 다음과 같이 컴파일 된다.
```
p { font: 12px/30px; }
p.bar { color: red; }
```

#{}를 이용해서 코드의 어디든지 변수 값을 넣을 수 있습니다.
```
$family: unquote("Droid+Sans");
@import url("http://fonts.googleapis.com/css?family=#{$family}");
```
```
@import url("http://fonts.googleapis.com/css?family=Droid+Sans");
```
Sass의 내장 함수 unquote()는 문자에서 따옴표를 제거합니다.


## 변수 유효범위(Variable Scope)
변수는 사용 가능한 유효범위가 있습니다.
선언된 블록({}) 내에서만 유효범위를 가집니다.

변수 $color는 .box1의 블록 안에서 설정되었기 때문에, 블록 밖의 .box2에서는 사용할 수 없습니다.
```
.box1 {
  $color: #111;
  background: $color;
}
// Error
.box2 {
  background: $color;
}
```

## @at-root (중첩 벗어나기)
중첩에서 벗어나고 싶을 때 @at-root 키워드를 사용합니다.
중첩 안에서 생성하되 중첩 밖에서 사용해야 경우에 유용합니다.

SCSS:
```
.list {
  $w: 100px;
  $h: 50px;
  li {
    width: $w;
    height: $h;
  }
  @at-root .box {
    width: $w;
    height: $h;
  }
}
```
Compiled to:
```
.list li {
  width: 100px;
  height: 50px;
}
.box {
  width: 100px;
  height: 50px;
}
```

아래 예제 처럼 .list 안에 있는 특정 변수를 범위 밖에서 사용할 수 없기 때문에, 위 예제 처럼 @at-root 키워드를 사용해야 합니다.(변수는 아래에서 설명합니다)
```
.list {
  $w: 100px;
  $h: 50px;
  li {
    width: $w;
    height: $h;
  }
}

// Error
.box {
  width: $w;
  height: $h;
}
```
## 중첩된 속성
font-, margin- 등과 같이 동일한 네임 스페이스를 가지는 속성들을 다음과 같이 사용할 수 있습니다.

SCSS:
```
.box {
  font: {
    weight: bold;
    size: 10px;
    family: sans-serif;
  };
  margin: {
    top: 10px;
    left: 20px;
  };
  padding: {
    bottom: 40px;
    right: 30px;
  };
}
```
Compiled to:
```
.box {
  font-weight: bold;
  font-size: 10px;
  font-family: sans-serif;
  margin-top: 10px;
  margin-left: 20px;
  padding-bottom: 40px;
  padding-right: 30px;
}
```
## 임포트
@import 지시어를 이용해서 다른 css 파일을 임포트할 수 있다. 사실 이 기능은 css의 원래 기능이다. 대신 css 파일이 아닌 scss, sass 파일을 임포트할 수 있다.


## 확장
확장은 이미 정의해둔 다른 셀렉터의 속성에 현재 셀렉터가 얹어가는 효과를 낼 수 있다.  따라서 특정한 클래스군에 대해서 베이스 클래스에서 공통 속성을 지정하여, 다른 클래스들이 베이스 클래스를 상속받는 효과를 낼 수 있다.  확장 문법은 @extend 최상위셀렉터의 형태로 사용한다.
```
// 베이스 클래스
.message {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

.success {
  @extend .message;
  border-color: green;
}

.error {
  @extend .message;
  border-color: red;
}
```
공통 속성은 각각의 셀렉터 내로 포함되는 것이 아니라, 상속받는 셀렉터가 상위 셀렉터로 선언 부가 병합된다.  따라서 위 예제는 아래와 같이 컴파일 된다.
```
.message, .success, .error {
  border: 1px solid #cccccc;
  padding: 10px;
  color: #333;
}

.message { border-color: green; }
.error { border-color: red; }
```
## 믹스인
공통적으로 많이 쓰이는 CSS 선언값들을 묶어서 믹스인으로 만들어 재사용이 가능하게끔 할 수 있다. 변수는 단일 값을 담을 수 있는 것에 비해, 믹스인은 여러 속성의 정의 및 셀렉터에 대한 속성 전체등 블럭 단위로 재사용할 수 있다.

특별히 믹스인을 정의할 때에는 파라미터를 받을 수 있게끔 할 수 있기 때문에 단순 복붙이 아닌 파라미터 값에 따른 가변적 속성 집합을 만들어 유용하게 쓸 수 있다.

다음 예는 둥근 외곽선을 지정할 때 벤더별로 다른 접두어가 붙는 속성들을 매번 반복해서 쓰지 않도록 하는 테크닉이다.
```
@mixin border-radius($radius) {
  -webkit-border-radius: $radius;
  -moz-border-radius: $radius;
  -ms-border-radius: $radius;
  border-radius: $radius;
}

.box { @include border-radius(10px); }
```
위 예에서 보듯 믹스인은 @mixin 키워드를 이용해서 이름과 인자를 선언한다. 인자가 필요없는 믹스인은 ($인자) 부분을 생략할 수 있다. 인자는 일반 변수처럼 정의한다.

믹스인을 사용할 때에는 @include 지시어를 사용한다.

## 믹스인의 인자값
믹스인의 인자는 선언하는 만큼 사용할 수 있다. 만약 인자값에 디폴트를 적용하고 싶다면, 변수 선언과 같은 문법으로 인자변수의 초기값을 설정해 줄 수 있다.
```
@mixin dashed-box($color, $width: 2px) { .. }
```
@include 구문에서 인자값은 선언된 순서대로 쓸 수 있으며, 보다 명확한 구분을 위해서 인자의 이름을 직접 기입할 수 있다. 인자의 각 이름을 명시한 경우에는 순서가 바뀌어도 상관없다.
```
.box { @incluxe dashed-box($width: 3px, $color: #eee) }
```
## 리스트 인자
인자명에 ... 을 붙이면 단일 값이 아닌 리스트로 인자를 받는 다는 의미이다. 이는 일련의 연속값을 속성으로 사용하는 경우에 활용할 수 있다.

이 문법은 파이썬의 *args, **kwds 등 시퀀스/맵 분해와 비슷하게 동작한다. 아래에서 살펴보겠지만 인자를 넣는 시점에도 같은 식으로 전달할 수 있다.

예를 들어 그림자 속성은 컴마로 구분된 리스트가 될 수 있다.
```
@mixin box-shadow($shadows...) {
  -moz-box-shadow: $shadows;
  -webkit-box-shadow: $shadows;
  box-shadow: $shadows;
}

.shadows { @include box-shadows(0px 4px 5px #666, 2px 6px 10px #999); }
```
... 표현은 리스트나, 맵을 개별 인자들로 분해해서 함수나 믹스인에 전달할 때 사용될 수 있다.
```
@mixin colors($text, $background, $border) {
  color: $text;
  background-color: $background;
  border-color: $border;
}

$values: #ff0000, #00ff00, #0000ff;
.primary { @include colors($values...); }
```
블럭을 믹스인에 넘기기
흔한 케이스는 아니지만, 블럭 자체를 믹스인에 넘겨줄 수 있다.  믹스인내에서 @content 지시어를 쓴 부분이 넘겨받은 블럭으로 치환된다.
```
@mixin code-inline {
  code {
    background-color: #cecece;
    padding: 2px;
    border-radius: @include border-raidus(4px);
    font-family: monospaces;
    @content
  }
}

p {
  @include code-inline {
    color: #33ccff;
    font-size: .8em;
  }
}
```
## 커스텀 함수
css 속성 정의의 모듈화와 재사용은 믹스인을 통해서 처리하면 된다. 함수는 어떤 값들을 사용해서 하나의 리턴값을 생성하는 용도로 사용하는 것이 좋다. 함수의 정의는 @function 지시어를 통해서 정의하며, 내부에서는 @return 지시어를 통해서 값을 내보낸다. 다음 예는 그리드 시스템에서 개별 셀과 여백의 크기를 통해서 n칸짜리 요소의 폭을 계산하는 함수이다.
```js
$grid-width: 40px; 
$gutter-width: 10px; 
@function grid-width($n) {
   @return $n * $grid-width + ($n -1 ) * $gutter-width; 
} 
#sidebar { width: grid-width(5); } // 믹스인과 달리 @include를 쓰지 않는다.
```
함수 역시 믹스인과 마찬가지로 복수 인자 및 인자 분해 등을 적용해서 사용할 수 있다. 또한 SASS 내에서는 여러 기본 함수들이 내장되어 있는데, 이에 대해서는 분량 조절 관계로 별도로 다루도록 하겠다.

## 흐름제어
함수나 믹스인을 작성할 때 특정 조건에 따른 분기나, 조건 혹은 연속열 (리스트 나 맵)의 각 원소에 대해 반복하는 등 흐름 제어와 관련된 기능을 사용해야 할 필요가 있다. 이 때 흐름제어 지시어들을 사용할 수 있다.

## 분기분
분기구문은 @if 절을 이용하여 작성한다. @if 표현식 { ... } @else if 표현식 { ... } @else { ... } 식으로 연결되는 다중 분기를 만들 수 있다.
```
@mixin hcolor($n) {
  @if $n % 2 == 0 { color: white; }
  @else { color: blue; } 
}
.row-3 { @include hcolor(3); } 

@function text-color($brightness) {
  @if $brightness < 128 { @return #333; }
  @return #ccc; 
}
code { color: text-color(200);
```
## 반복문
반복문은 크게 3가지로 나뉜다.

@for : n ~ m 까지의 숫자 범위에 대해 각 정수값에 대해 순회한다.
@each : 주어진 리스트나 맵의 각 원소에 대해 순회한다.
@while : 주어진 조건을 만족하는 동안 반복한다.
각각은 간단하게 예로 표현하겠다.
```
@for $i from 1 through 3 { // 1, 2, 3,에 대해 반복
  .time-#{$i} { width: 2em * $i; } 
} 

// 리스트 내 각 문자열 원소에 대해서... 
@each $animal in puma, sea-slug, egret, alamander {
  .#{$animal}-icon {
    background-image: url('/image/#{$animal}.png');   
  }
}

// 6, 4, 2번 아이템에 대해서 
$i : 6; 
@while $i > 0 {
  .item-#{$i} { width: 2em * $i }
  $i: $i - 2; 
}
```
여기서 소개하지 않은 몇 가지 기능들이 몇 가지 더 있는데 미디어 쿼리나 블럭 내에서 루트레벨 셀렉터 속성 지정하기, 플레이스 홀더를 사용한 지정문맥상속등이 있는데 흔히 쓰이는 기능은 아니어서 생략하도록 하겠다.

그외에 SASS에서 기본적으로 제공하는 내장함수들에 대해서는 별도로 살펴볼 필요가 있을 것이다. 특히 색상과 관련된 함수를 이용하면 별도의 그래픽 툴을 써서 색상값을 일일이 추출할 필요 없이 메인 색상으로부터 톤을 다양하게 변화시켜 사용하는데 활용할 수 있다.  그리고 리스트나 맵과 같은 자료 구조를 이용하면 더 많은 반복작업을 간단하게 처리하는데 도움이 될 수 있고, 이러한 기능들은 모두 기본 내장 함수에 의존하므로 그 때 그 때 찾아서 보도록 한다.
