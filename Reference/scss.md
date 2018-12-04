# SCSS Document

# SASS란? 

#### [심화](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#boolean_operations)

- CSS pre-processor (전처리기)
  - css를 확장하는 스크립팅 언어로서, 컴파일러를 통하여 브라우저에서 사용할 수 있는 일반 css 문법 형태로 변환합니다.
- Sass는 css를 만들어주는 언어로 자바스크립트 처럼 특정 속성(ex. color, margin, width ...)의 값(ex. #000, 3px, 400px ...)을 변수로 선언하여 필요한 곳에 변수를 적용할 수도 있고, 반복되는 코드를 한번의 선언으로 여러 곳에서 재사용할 수 있도록 해주는 등의 기능을 가졌다.
- Sass는 복작한 작업을 쉽게 할 수 있게 해주고, 코드의 재활용성을 높여줄 뿐만 아니라, 코드의 가독성을 높여주어 유지보수를 쉽게해줍니다.
- Sass 파일의 확장자는 .scss 이다.

## SASS vs SCSS

Sass 는 SASS 표기법(.sass)과 SCSS표기법(.scss)이 있다. 이전 버전에서는 SASS 표기법이 기본 표기법이었으나 Sass 3.0부터 CSS친화적인 scss 표기법이 기본 표기법이 되었다.

## 주석(Comment)

한 줄 주석(//)과 여러 줄 주석(/* */)이 있다. 기존 css에서는 한줄 주석이 없었다.

sass 에서 한줄 주석(//)은 css로 컴파일 되었을 때 나타나지 않는다. 여러 줄 주석은 컴파일 되었을 때 동일하게 나타난다.

## 데이터타입

sass 에서 사용할 수 있는 데이터타입

- 숫자 : 1,2, 3 ... 10px 도 숫자로 본다.
- 문자열 : 겹따옴표, 홑따옴표, 따옴표가 없는 것 모두 문자열로 인식
- 색상 : blue, #001100, rgba(255, 0, 0, 0,3)
- 불리언 : true, false
- null
- 리스트(lists) : 괄호 속에서 컴마나 공백으로 구분.
  - margin, padding 속성 값 지정에 사용되는 0 auto와 font-family 속성 값 지정에 사용되는 Helvetica, Arial, Sans-serif 등은 공백또는 콤마로 구분된 값의 list이다.
  - 1.5em 1em 0 2em, Helvetica, Arial, sans-serif
- 맵(maps) : 키:값 쌍이 괄호로 구분 (JSON과 유사한 방식)
  - (key1 : value1, key2 : value2, key3 : value3)



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

&을 사용하면 현재 블럭이 적용되는 셀렉터를 참조한다. 정확하게는 참조가 아닌 치환이다. 특히 현재 속성을 설정중인 셀렉터에 의사셀렉터를 적용할 때 유용하다.

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

이 & 은 현재 셀렉터로 치환되기 때문에 다음과 같이 복합어로 이루어진 클래스들을 하나의 블럭으로 네스팅하여 묶을 때도 유용하게 쓰일 수 있다. 워드 프레스 테마의 경우를 예로 들면, 위젯들은 모두 widget-**** 의 식으로 클래스 이름을 갖는다. 이 들을 개별 셀렉터로 쓰지 않고 아래처럼 네스팅할 수 있다는 이야기다.

위 예에서 & 은 .widget 으로 치환되므로 컴파일된 결과는 아래와 같다.

```
.widget { font-weight: 400; }
.widget-area { font-weight: 600; }
.widget-top_posts { font-weight: 1000; }
```

## 변수와 연산자

색상이나 선 스타일, 폰트 패밀리등은 대체로 사이트 내에서 공통적으로 정의해놓은 값을 쓰는 경우가 많다. 이들을 매번 지정하지 않고 변수로 들어서 사용하면 변경 시점에 변수의 내용만 수정하여 모든 곳의 값을 공통적으로 바꿀 수 있을 것이다.

| 타입   | 설명                                                         |
| ------ | ------------------------------------------------------------ |
| 숫자값 | 숫자 리터럴로 쓰인 값은 숫자로 판단한다. 크기를 나타내는 단위가 붙은 경우도 숫자로 취급한다. 12px, 1.534rem |
| 문자열 | 문자의 경우 기본적으로 따옴표 여부에 상관없이 문자열로 취급한다. |
| 색상값 | 색상명이나 색상리터럴로 표기된 값은 색으로 인식한다. (blue, #aa33cc, rgba(255, 0, 0, 0.3)) |
| 불리언 | true, false                                                  |
| 널     | null                                                         |
| 리스트 | 리스트 내 원소는 동일 타입일 필요는 없으며, 괄호 속에 컴마나 공백으로 구분된 값들을 리스트로 본다. |
| 맵     | 괄호 속에서 : 으로 키 : 값을 구분하여 쓴다.                  |

## 문자열의 치환 및 내삽(interpolation)

\#{...} 을 사용하면 문자열 내에 표현식의 결과를 내삽하거나, 다른 변수의 내용으로 치환하는 것이 가능하다. 이는 속성값의 일부 혹은 전체 뿐만 아니라 속성명이나 셀렉터에 대해서도 적용 가능하다.

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

\#{}를 이용해서 코드의 어디든지 변수 값을 넣을 수 있습니다.

```
$family: unquote("Droid+Sans");
@import url("http://fonts.googleapis.com/css?family=#{$family}");
@import url("http://fonts.googleapis.com/css?family=Droid+Sans");
```

Sass의 내장 함수 unquote()는 문자에서 따옴표를 제거합니다.

## 변수 유효범위(Variable Scope)

변수는 사용 가능한 유효범위가 있습니다. 선언된 블록({}) 내에서만 유효범위를 가집니다.

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

중첩에서 벗어나고 싶을 때 @at-root 키워드를 사용합니다. 중첩 안에서 생성하되 중첩 밖에서 사용해야 경우에 유용합니다.

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

확장은 이미 정의해둔 다른 셀렉터의 속성에 현재 셀렉터가 얹어가는 효과를 낼 수 있다. 따라서 특정한 클래스군에 대해서 베이스 클래스에서 공통 속성을 지정하여, 다른 클래스들이 베이스 클래스를 상속받는 효과를 낼 수 있다. 확장 문법은 @extend 최상위셀렉터의 형태로 사용한다.

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

공통 속성은 각각의 셀렉터 내로 포함되는 것이 아니라, 상속받는 셀렉터가 상위 셀렉터로 선언 부가 병합된다. 따라서 위 예제는 아래와 같이 컴파일 된다.

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

블럭을 믹스인에 넘기기 흔한 케이스는 아니지만, 블럭 자체를 믹스인에 넘겨줄 수 있다. 믹스인내에서 @content 지시어를 쓴 부분이 넘겨받은 블럭으로 치환된다.

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

```
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

Sass의 @if 조건문에서 사용되는 논리(Boolean) 연산에는 ‘그리고’,’ 또는’, ‘부정’이 있습니다. 자바스크립트 문법에 익숙하다면 &&, ||, !와 같은 기능으로 생각하면 됩니다.

종류	설명 
and	그리고 
or	또는 
not	부정(반대) 
간단한 예제를 확인하고, 더 자세한 내용은 조건문에서 살펴보겠습니다.

SCSS:

```
$width: 90px;
div {
  @if not ($width > 100px) {
    height: 300px;
  }
}
```

Compiled to:

```
div {
  height: 300px;
}
```

## 반복문

반복문은 크게 3가지로 나뉜다.

@for : n ~ m 까지의 숫자 범위에 대해 각 정수값에 대해 순회한다. @each : 주어진 리스트나 맵의 각 원소에 대해 순회한다. @while : 주어진 조건을 만족하는 동안 반복한다. 각각은 간단하게 예로 표현하겠다.

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

그외에 SASS에서 기본적으로 제공하는 내장함수들에 대해서는 별도로 살펴볼 필요가 있을 것이다. 특히 색상과 관련된 함수를 이용하면 별도의 그래픽 툴을 써서 색상값을 일일이 추출할 필요 없이 메인 색상으로부터 톤을 다양하게 변화시켜 사용하는데 활용할 수 있다. 그리고 리스트나 맵과 같은 자료 구조를 이용하면 더 많은 반복작업을 간단하게 처리하는데 도움이 될 수 있고, 이러한 기능들은 모두 기본 내장 함수에 의존하므로 그 때 그 때 찾아서 보도록 한다.



## 변수(Variable)

css에 변수 개념을 도입 변수로 사용 가능한 형태 - 숫자, 문자열, 폰트, 색상, null, lists, maps 변수를 선언하고 사용할 때는 $문자를 사용.

변수란? 데이터를 저장하는 곳, 저장해뒀다가 필요할 때 사용할 수 있다.

```
$변수명 : 속성값;
// sass

$bg-color:#333;

.header{
	background-color:$bg-color;
}

// css compiled

.header{
	background-color:#333;
}
```

변수를 만들어도, 사용하지 않으면 컴파일된 css파일에는 아무것도 나타나지 않음

### 변수 범위(Variable Scope)

Sass의 변수에 변수 범위가 적용된다. 변수를 특정 selector(선택자)에서 선언하면 해당 selector에서만 접근이 가능!(지역변수) 지역변수의 유효범위는 자신이 속한 코드블럭과 하위 코드 블럭이다.

```
// sass

$bg-color:#eee;

.header{
	$bg-color:#333;
	background-color:$bg-color;
}
.container{
	background-color:$bg-color;
}

// css compiled

.header {
	background-color: #333;
}

.container {
	background-color: #eee;
}
```

### `!global` 플래그

변수를 선언할 때 전역(global)으로 설정 할 때는 `!global` 플래그를 사용한다. (코드 블럭안에서 선언한 변수를 전역변수로 사용하고자 할 때 사용한다.)

```
// sass

$bg-color:#eee;

.header{
	$bg-color:#333 !global;
	background-color:$bg-color;
}
.container{
	background-color:$bg-color;
}

// css compiled

.header {
	background-color: #333;
}

.container {
	background-color: #333;
}
```

### `!default` 플래그

`!default` 플래그는 해당 변수가 설정되지 않았거나 값이 null 일 때 값을 설정한다.

```
// sass

$bg-color:#333;
$bg-color:#eee !default;

.header{
	background-color:$bg-color;
}

// css compiled

.header {
	background-color: #333;
}
```

## 수학 연산자(Math Operators)

Sass에서는 수학 연산자들을 사용 할 수 있다.

| Operator | Description    |
| -------- | -------------- |
| +        | addition       |
| -        | subtracition   |
| /        | division       |
| *        | multiplication |
| %        | modulo         |
| ==       | equality       |
| !=       | inequality     |

```
// sass

.container{
	.lnb{
		float:left;
		width:100px / 500px * 100%;
	}
	.contents{
		float:left;
		width:400px / 500px * 100%;
	}
}

// css compiled

.container .lnb {
	float: left;
	width: 20%;
}

.container .contents {
	float: left;
	width: 80%;
}
```

주의할 점은 `+`,`-` 연산자를 사용할 때는 단위를 언제나 통일 시켜야한다. 아래와 같은 코드는 오류이다.

```
$width : 100% - 40px;
```

위와 같은 작업을 해야한다면 css의 `calc()` 함수를 사용해야한다.

%, em, rem, vh, vw, vmin, vmax와 같이 상대적인 값을 Sass는 알지 못한다. 상대적인 값의 결과값은 브라우저만이 알 수 있기 때문! 상대적인 값을 갖는 단위의 연산은 동일한 단위를 갖는 값과의 연산만이 유효하다.

```
#foo{
	width:5% + 10% ;	// 15%
}
```

### `/` 연산자

```
p{
	font: italic bold 12px/30px Georgia, serif;
}
```

css에서의 `/`는 나눗셈의 의미가 아니라 값을 분리하는 의미를 갖는다. Sass의 `/` 연산자를 사용하기 위해서는 몇가지 조건이 필요하다.

- 변수에 대해서 사용
- 괄호 내에서 사용
- 다른 연산의 일부로서 사용

변수를 css의 `/`와 함께 사용하고자 하는 경우 `#{}`를 사용한다.

```
p{
	$font-size:12px;
	$line-height:30px;
	font:#{$font-size}/#{$line-height};	// 12px/30px
}
```

## 내장함수(Built-in Functions)

자바스크립트에서 제공하는 내장함수처럼 Sass에서도 많은 내장함수를 지원해준다. 그중에 `darken()` 함수를 사용해본다. 이 함수는 얼마나 어둡게 색상을 적용할지 인수로 던져주면 자동으로 색상을 계산해서 나타내준다.

```
// sass

$buttonColor: #2ecc71;
$buttonDark: darken($buttonColor, 10%);
$buttonDarker: darken($buttonDark, 10%);

.foot_menu{
	li{
		display: inline-block;
		a{
			background-color:$buttonColor;
			color:#fff;
		}
		&:nth-child(2){
			a{
				background-color:$buttonDark;
			}
		}
		&:nth-child(3){
			a{
				background-color:$buttonDarker;
			}
		}
	}
}

// css compiled

.foot_menu li a {
	background-color: #2ecc71;
	color: #fff;
}
.foot_menu li:nth-child(2) a {
    background-color: #25a25a;
}
.foot_menu li:nth-child(3) a {
    background-color: #1b7943;
}
```

이 함수 외에도 유용한 함수들이 엄청 많다. [여기서](http://jackiebalzer.com/color) 확인할수 있다.

### `&` Ampersand

- 부모참조선택자(Referencing Parent Selectors)
- 부모선택자를 참조할 때는 `&`문자를 사용한다.

```
// sass
a{
	color:#000;
	&:hover{
		text-decoration:underline;
		color:red;
	}
	&:visited{
		color:purple;
	}
}

// css compiled

a {
	color: #000;
}
a:hover {
	text-decoration: underline;
	color: red;
}
a:visited {
	color: purple;
}
```

#### `&` 활용

##### 적은 반복으로 의사 클래스를 작성할 수있다.

```
// sass

a{
	&:visited{}
	&:hover{}
	&:active{}
}

// css compiled

a:visited{}
a:hover{}
a:active{}
```

##### 자식, 인접 형제, 일반 형제 선택자와 함께 사용하면 편하다.

```
// sass

a{
	& > span{}
	& + span{}
	& ~ span{}
}

// 위 코드에서 &는 생략 할 수 있다.
/*
a{
	> span{}
}
*/

// css compiled

a > span{}
a + span{}
a ~ span{}
```

##### 반드시 `&`로 시작할 필요는 없다. 오른쪽에 배치하여 선택자를 한정시킬 수 있다.

```
// sass

.header{
	body.main &{
		border-bottom:10px solid rgba(255, 0, 0, 0.4);
	}
}

// css compiled

body.main .header{border-bottom:10px solid rgba(255, 0, 0, 0.4);}
```

##### 클래스를 조합할 수 있다.

```
// sass

.btn{
	&-default{}
	&-primary{}
}

// css compiled

.btn-default{}
.btn-primary{}
```

##### `&`는 완전히 컴파일 된 부모 선택자이다 라는 것을 생각하자.

```
//sass

.parent {
	.child {
		& div & & > a {	// & <- 이 줄 전까지 컴파일된 부모 선택자를 가지고온다고 보면 된다. 그럼 & 는 .parent .child 가 된다.
			color:red;
		}
	}
}

// css compiled

.parent .child div .parent .child .parent .child > a{color:red;}
```

### `@at-root`

중첩에서 벗어나려면 `@at-root` 지시자를 사용한다. 아래 코드에서 sibling 클래스가 container 클래스 밖에서도 사용한다고 할때 이 지시자를 사용한다.

```
// sass

.container{
	.child{
		color:blue;
	}
	@at-root .sibling{
		color:gray;
	}
}

// css compiled

.container .child {
	color: blue;
}
.sibling {
	color: gray;
}
```

### 속성 중첩

font와 같은 속성은 `font-family`, `font-size`, `font-weight` 등의 세부속성으로 나뉘는데, 이들 역시 중첩으로 표현할 수 있다.

```
// sass

h1{
	font : {
		family:verdana;
		size:20px;
		weight:bold;
	}
}

// css compiled

h1 {
	font-family: verdana;
	font-size: 20px;
	font-weight: bold;
}
```

### 중첩을 사용할 때 참고할 것

Sass 코드 중첩을 할때, 4레벨 보다 깊게 들어가지 말 것

- 유지보수가 어려워진다.
- 가독성이 떨어진다.

## 불러오기(Import)

import 기능은 스타일들을 여러파일들로 나누고, 다른파일에서 불러와서 사용하는 기능이다. (1개의 css파일에 모든 스타일을 기술하는 것은 가독성을 나쁘게한다. 따라서 규칙을 정해서 파일을 분리하여 개발하는 것이 유지보수 측면에서 효과적이다.) `@import` 지시자를 사용하여 분리된scss 파일을 불러올 수 있다.

```
@import "layout.scss";
```

확장자는 생략이 가능하다.

```
@import "layout";
```

한줄에 여러 scss를 import한다.

```
@import "common", "easing";
```

### partial

여러개의 파일로 분할 하는 것 또는 분할된 파일을 partial이라 하며 partial된 sass 파일명의 선두에는 underscore(_)를 붙인다. (_reset.scss, _module.scss, _print.scss)

예를 들어 "_reset.scss"라는 partial된 Sass 파일이 있고 이 파일을 import 할 경우 `@import "reset"` 이처럼 기술할 수 있는데, 파일 명 선두의 _는 생략할 수 있다.

partial된 sass 파일명 선두에 붙인 (_) 의 의미는 import는 수행하되 css로의 컴파일은 수행하지 말라는 의미를 갖는다. 따라서 partial은 import시에는 css파일로 컴파일 되지 않기 때문에 최종적으로 css로 컴파일을 수행할 Sass 파일에서 import한다.

`@import`는 CSS rule 또는 @media rule 내에 포함시키는 것도 가능하다.

```
//scss

// _color.scss
.example{
	color:red;
}

#main {
	@import "color";
}

// css compiled

#main .example{
	color:red;
}
```

## 상속(Extend)

### `@extend` 지시자

특정 선택자를 상속 할 때 사용한다.

적용 방법 `@extend .클래스명` `@extend %클래스명`

```
// sass

.txt{
	font-size:12px;
	line-height:1.6;
	letter-spacing: -.5px;
	color:#333;
}
.box_cont{
	@extend .txt;
}

// css compiled

.txt, .box_cont {
	font-size: 12px;
	line-height: 1.6;
	letter-spacing: -.5px;
	color: #333;
}
```

주의할 점!

- @media 안에서 외부의 선택자를 @extend할 수 없다.
- 같은 지시어 안에 있는 선택자만 @extend할 수 있다.

`@extend`는 속성을 중복하지 않고 선택자를 합치기 때문에 파일 크기와 관련해서 도움이 된다고 한다.

### placeholder 선택자 `%`

`%`를 사용하면 상속은 할 수 있지만 해당 선택자는 컴파일 되지 않는다.

```
// sass

%txt{
	font-size:12px;
	line-height:1.6;
	letter-spacing: -.5px;
	color:#333;
}
.box_cont{
	@extend %txt;
}

// css compiled

.box_cont {
	font-size: 12px;
	line-height: 1.6;
	letter-spacing: -.5px;
	color: #333;
}
```

## 믹스인(Mixin)

extend와 비슷하지만 argument(인수)를 받을 수 있습니다. mixin을 선언 할 때는 `@mixin` directive를 사용하며, 이를 사용할 때는 `@include` directive를 사용한다.

선언 - `@mixin mixin명(인자값){}` 호출 - `@include mixin명(인자값)`

```
// sass

@mixin headline($color, $size){
	color:$color;
	font-size:$size;
	font-weight:bold;
	margin-bottom:10px;
	line-height:1;
}
.box_cont{
	h2{
		@include headline(#000, 15px);
	}
}

// css compiled

.box_cont h2 {
	color: #000;
	font-size: 15px;
	font-weight: bold;
	margin-bottom: 10px;
	line-height: 1;
}
```

Mixin을 응용해본다.

```
// sass

@mixin media($queryString){
	@media #{$queryString}{
		@content;
	}
}
.wrap{
	@include media("(max-width:767px)"){
		max-width:100%;
	}
}

// css compiled

@media (max-width: 767px) {
	.wrap {
		max-width: 100%;
	}
}
```

mixin을 활용해서 vendor prefix를 적용하는 코드를 만들어본다.

```
// sass

@mixin prefix($property, $value){
	@each $prefix in -webkit-, -moz-, -ms-, -o-, '' {
		#{$prefix}#{$property}:$value;
	}
}

.radius{
	@include prefix(transition, 0.5);
}

// css compiled

.radius {
	-webkit-transition: 0.5;
	-moz-transition: 0.5;
	-ms-transition: 0.5;
	-o-transition: 0.5;
	transition: 0.5;
}
```

### 전달 인자 기본값 설정

믹스인 호출 시 인자를 전달하지 않아 오류가 발생하는 것을 방지하기 위해서 특정 값을 기본으로 설정할 수 있다.

```
// sass
@mixin border-radius($radius:4px){
	-webkit-border-radius:$radius;
	-moz-border-radius:$radius;
	border-radius:$radius;
}

div{
	@include border-radius;
}

// css compiled
div{
	-webkit-border-radius:4px;
	-moz-border-radius:4px;
	border-radius:4px;
}
```

### 키워드 인자값

Sass 3.1에서 새롭게 소개된 키워드 아규먼트이다. 키워드 아규먼트는 믹스인이 여러개 인자를 받아야 할 때 특히 유용하다.

```
// sass
@mixin border-radius($radius:4px, $moz:true, $webkit:true, $ms:true){
	@if $moz {-moz-border-radius:$radius;}
	@if $webkit {-webkit-border-radius:$radius;}
	@if $ms {-ms-border-radius:$radius;}
	border-radius:$radius;
}

.wrap{
	@include border-radius(10px, $moz:false);
}

// css compiled

.wrap{
	webkit-border-radius: 10px;
	-ms-border-radius: 10px;
	border-radius: 10px;
}
```

### `#{}` Interpolation

보간법이라고도 한다. 이 표현은 특정문자열을 따로 처리하지 않고 그대로 출력 할 때 사용 변수는 속성값으로만 사용할 수 있으나 `#{}`을 사용하면 속성값은 물론 셀럭터와 속성명에도 사용할 수 있다. 또한 연산의 대상으로 취급되지 않도록 할 수도 있다.

### `@content` 지시자

선택자 내부의 내용들이 @content부분에 나타나게 된다.

## 함수(Function)

내장함수(Built-in function)과는 달리 이 부분은 임의 함수이다. mixin은 style markup을 반환하지만, function은 `@return` 지시자를 통하여 값을 반환한다. `@function` 지시자를 사용해서 함수를 만든다.

```
// sass

@function calc-percent($target, $container){
	@return ($target / $container) * 100%;
}
@function cp($target, $container){
	@return calc-percent($target, $container);
}
.container{
	.lnb{
		width:cp(100px, 500px);
	}
}

// css compiled

.container .lnb {
	width: 20%;
}
```

자주 사용할 것 같은 함수는 위와 같이 단축함수를 만들어 사용해라!

### `@debug`, `@warn` 지시어

위 두 지시어는 컴파일 시 확인 가능하다. 오류를 사용자에게 알려주고자 할때 사용할 수 있다(cmd 및 터미널에서 확인가능)

```
// sass
@function contrast-text($bgcolor, $amount : 50%){
	$text-color: null;

	// 유효성 겁사
	@if type-of($bgcolor) != colorP{
		@warn "전달 받은 인자의 데이터 형이 잘못되었습니다. color형이 필요하다.";
		@debug "전달 받은 인자 $bgcolor 값은 #{type-of($bgcolor)} 입니다"
	}
	.
	.
	.
}
```

## @if

Sass 에서도 조건문을 사용할 수 있다. `@if , @else if, @else`

```
// sass

$box-type:text;
ul{
	li{
		@if $box-type == text {
			font-size:15px;
		} @else if $box-type == thum {
			font-size:12px;
		}
	}
}

// css compiled

ul li {
	font-size: 15px;
}
```

## if() 함수

```
if(condition, if_true, if_false)
a{
	color:if($type == ocean, bl;ue, black);
}
```

## @for

Sass 에서도 반복문을 사용할 수 있다. 순차적인 값에 대해서 사용한다. `@for` 지시자를 사용한다.

```
// sass

@for $i from 1 through 3{
	.lst-#{$i}{
		padding-left:10px * $i;
	}
}

// css compiled

.lst-1 {
	padding-left: 10px;
}
.lst-2 {
	padding-left: 20px;
}
.lst-3 {
	padding-left: 30px;
}
```

범위 표현은 `from 1 to 3`로 쓸수도 있다.

## @each

`@each`는 리스트나 맵의 각 값을 순회한다. 맵의 경우 변수를 키, 값으로 준다.

```
// sass

@each $animal in puma, sea-slug, egret, salamander {
	.#{$animal}-icon {
		background-image: url('/images/#{$animal}.png');
	}
}

// css compiled

.puma-icon {
	background-image: url("/images/puma.png");
}
.sea-slug-icon {
	background-image: url("/images/sea-slug.png");
}
.egret-icon {
	background-image: url("/images/egret.png");
}
.salamander-icon {
	background-image: url("/images/salamander.png");
}
// sass

@each  $animal, $color, $cursor in(puma, black, default), (sea-slug, blue, pointer), (egret, white, move){
	.#{$animal}-icon{
		background-image:url('/images/#{$animal}.png');
		border:2px solid $color;
		cursor:$cursor;
	}
}

// css compiled

.puma-icon {
	background-image: url("/images/puma.png");
	border: 2px solid black;
	cursor: default;
}

.sea-slug-icon {
	background-image: url("/images/sea-slug.png");
	border: 2px solid blue;
	cursor: pointer;
}

.egret-icon {
	background-image: url("/images/egret.png");
	border: 2px solid white;
	cursor: move;
}
// sass

@each $header, $size in (h1:2em, h2:1.5em, h3:1.2em){
	#{$header}{
		font-size:$size;
	}
}

// css compiled

h1 {
	font-size: 2em;
}
h2 {
	font-size: 1.5em;
}
h3 {
	font-size: 1.2em;
}
```

## @while

`@while` 반복문을 사용할 수 있다.

```
// sass

$j: 6;
@while $j > 0 {
    .item-#{$j} { width: 2em * $j; }
    $j: $j - 2;
}

// css compiled

.item-6 {
	width: 12em;
}
.item-4 {
	width: 8em;
}
.item-2 {
	width: 4em;
}
```

## sass-guidelin 요약

- 탭 대신 스페이스 두(2)칸을 들여쓴다.
- 행의 너비는 80글자
- css를 여러 행으로 적절히 작성한다.
- 공백을 의미 있게 사용한다.
- 문자열과 URL에는 인용 부호(작은 따옴표)를 붙인다.
- 뒤 따르는 0은 표 기하지 앟는다.
- 연산은 괄호로 감싼다.
- 매직 넘버를 피한다.
- 색은 키워드 > HSL > RGB > 16진법 순으로 표기한다.
- 리스트는 쉼표로 구분
- 리스트에는 뒤뜨르는 쉼표를 붙이지 않는다.
- 맵에는 뒤따르는 쉼표를 붙인다.
- 가상 클래스와 가상 요소 외에는 선택자를 내포하지 않는다.
- 작명 시 하이픈으로 구분
- 많은 주석을 붙인다.
- 간단한 믹스인을 사용한다.
- 반복문은 최소한으로 사용, `@while`은 사용하지 않는다.
- 의존성의 수를 줄인다.
- 경고와 오류를 의미 있게 사용!