# GraphQL

그래프 큐엘을 처음 접할떄 혼란을 많이 받았습니다.(물론 제가 찌질한 실력이라 혼잡했겠지요......)

왜냐하면 그래프큐엘이 딱 정해저 있는 하나의 모듈이나, 라이브러리, 프레임워크 혹은 npm으로 정해져 있을거라고 생각했기 때문입니다.

하지만 그래프 큐엘은 모듈, 라이브러리, 프레임워크, npm이 모두 존재하며 그래프큐엘 쿨, 그래프큐엘 바스 등 너무나게 많고, 유연하게 골라서 사용할 수 있게 해놨습니다.  

공식 홈페이지는 [그래프큐엘 공식 홈페이지](https://graphql.github.io) 이고 설명이 나와있긴한대 그렇게 친절하지는 않습니다.

GraphQL은 다양한 방법으로 실행할 수 있습니다. 이러한 특징은 숙련자들에게는 유연한 방식이지만 처음 GraphQL을 접하는 사람들에게는 혼란을 줄 수 있는 지점인 것 같습니다.

저는 회사에서 사용하고 있는 Express에 붙혀보기위해 express 관련 그래프큐엘 사용법을 조금 알아보았습니당. [사용법](https://engineering.huiseoul.com/%ED%95%9C-%EB%8B%A8%EA%B3%84%EC%94%A9-%EB%B0%B0%EC%9B%8C%EB%B3%B4%EB%8A%94-graphql-421ed6215008)



###  GraphQL이란

GraphQL은 Client가 Server에게 데이터를 요청할때 이용하는 **API의 Query language** 입니다.

GraphQL을 간단히 설명해 보자면 클라이언트-서버 간 통신을 위해 기존 REST에서 사용하는 엔드포인트 방식 대신 DB에 날리는 SQL 쿼리처럼 API 서버를 대상으로 하는 쿼리 언어(Application Query Language)를 사용하는 방식입니당.



### GraphQL이 나온 계기

**1. 너무 많은 EndPoint와 다중요청**

Rest를 이용해 URI을 관리하다보면 너무 많은 EndPoint, 즉 Controller를 볼 수 있습니다. 많게는 한개부터, 10개 이상의 Controller가 있는걸 볼 수 있습니다.
이렇게 많은 EndPoint는 관리하기가 힘들뿐더러 각각의 EndPoint가 어떤 데이터를 주는지 알기 힘듭니다.

> 물론 설계를 잘 했다면 이러한 문제를 줄일 수는 있지만, 결국 언젠가는 마주칠 문제라고 생각합니다.

조금 더 깊게 생각해보면, 단순히 EndPoint가 많다는게 문제가 아니라는걸 알 수 있었습니다. REST의 가장 큰 문제는 **Resource와 EndPoint가 1:1 관계**라는 점 입니다.

> REST의 큰 특징 중 하나는, Resource를 기준으로 EndPoint를 나누는 것입니다.

예를들어, “특정 가수의 정보를 보여준다.” 라고 상황을 가정했을 때, RESTful하게 설계된 View에서는 아래와 같은 요청을 진행하게 됩니다.

```
GET /user HTTP/1.1
GET /user/songs HTTP/1.1
GET /user/videos HTTP/1.1
...
```

즉, 연관된 Resource 사이에서도 EndPoint가 모두 다르며, 이는 다중 요청을 초래하게 됩니다. 결국 불필요한 request/Connection이 사용 되며 overhead가 생기게 됩니다.

컴퓨터의 사양이 높아지고 있으며, 뿐만아니라 모바일도 쿼드코어/ 옥타코어인 시대에 **Connection의 비용까지 신경써가면서 스펙을 고려해야하는가?** 는 사람마다 의견이 다를 수 있을 것같습니다.

> 실제로 주변사람들과 대화해봤을 때, ‘Connection 비용이 얼마나된다고 .. ‘ 라는 말을 들은 적 있으니까요.

개인적으로는 불필요한 부분이라면 줄이는게 맞다. 라고 생각을 하고 있으며, 3G 환경등의, 고려할 수 있는 가장 낮은 Level의 기기도 신경써야하기때문에 문제가 될만한 요인들을 지우는게 좋을거라 생각하고 있습니다.

또한, HTTP 내에서 사용자들 식별하기 위한 Cookie 및 요청을 설명하기위한 메타 데이터들을 Header 담아 전송하는데, 다중 요청의 경우 중복된 헤더를 요청마다 보내게 되는 문제점도 있습니다.

> 크게 상관 없을거 같다고 함 -by logan

이 부분은 HTTP 2.0의 스펙으로 어느정도 해결가능하다고 생각됩니다.

> Header Compression 나, Multiplexing 등 ..



**2. Data 의 모호성**

REST를 사용할 경우, Client 개발자는 요청에 대한 응답으로 어떤 Data가 포함되어 있는지 알 수 없습니다. 포함되어있는 Data를 알기위해 문서화된 명세를 본다거나 직접 요청을 날려서 확인을 해야하는데, 이는 매우 번거롭고 귀찮은 작업이 될 수 있습니다.

때문에 이러한 문제를 도와주기(?) 위해 다양한 문서화 도구들이 출현하기 시작했고, 대표적인 도구로는 Swagger가 있다고 알고 있습니다.

나아가 기존 REST의 단점은 Client가 Data를 선택할 수 없다는 점입니다. 즉, Client 개발자는 Server에서 정해진 Data 양식을 **모두** 받아 처리해야하며, 데이터가 부족한 경우 별도의 Request를 한번 더 보내거나, Server 개발자와 커뮤니케이션을 통해 명세를 바꾸는 작업을 진행하게 됩니다. 즉, Client/Server 개발자 모두에게 불편한 유지보수(?)가 진행됩니다.

> 위 단점과 이어지는 내용이네요 :D

Data를 선택할 수 없다는 점은 **Over Fetching** 및 **Under Fetching**의 발생 원인이 될 수 있습니다. 가장 대표적인 예시로 같은 페이지를 보여주더라도, 필요한 정보와 필요없는 정보가 플랫폼(IOS,Android,Browser..)마다 각각 다를 수 있습니다.

REST에서는 이를 위해 별도의 EndPoint를 생성하거나, 플랫폼 정보를 인자로 받아 정보를 출력할 수 도 있습니다.

```
/user?ver=android 
```

이와같은 문제점 외에도 다양한 요구들이 발생했고 FaceBook은 2015년 REST의 문제점들을 해결하기 위해, GraphQL이라는 Sepc을 발표합니다.

> 현재는 많은 커뮤니티들이 언어별로 GraphQL Spec을 구현하고 있습니다.



---

그래프큐엘의  

```
1. Schema가 존재한다. + Query Language
2. 단일 EndPoint 
```

**Schema가 존재한다는 점**과 **단일 EndPoint**는 위에서 언급한 REST의 단점을 보완하기 위해 등장한 것으로, 사용자가 Schema를 정의해두면, 일반 SQL처럼 데이터를 선택해서 가져올 수 있으며, 이를 단 하나의 EndPoint 즉, 한번의 요청으로 처리 할 수 있습니다.

#### 사용 방법

> [GraphiQL](https://graphql-tryout.herokuapp.com/graphql)로 예제를 진행 할 수 있습니다.

#### GraphQL의 기본 Schema

GraphQL은 크게 Query 와 Mutation이라는 Schema로 구성되어져 있고, 각각은 다음과 같은 특성을 갖습니다.



#### Query

Query는 HTTP의 GET Method와 유사한 작업을 하는 함수입니다. 즉 Data를 요청하는 함수로, 아래와 같이 사용할 수 있습니다.

```
query{
  accounts {
    id
    username
    email
  }
}
```

> 해당 요청에대한 응답은 다음과 같습니다.

```
{
  "data": {
    "accounts": [
      {
        "id": "1",
        "username": "velopert",
        "email": "public.velopert@gmail.com"
      },
      {
        "id": "2",
        "username": "jn4kim",
        "email": "jn4kim@gmail.com"
      },
	  ..... 
}  
```

GraphQL은 기본적으로 하나의 EndPoint에 query를 보내는 것을 권장하고, json과 유사한 구조로 요청을 보낼 수 있습니다. 
위와같이 GraphQL을 사용하면 조금더 명확한 Data를 가져올 수 있습니다.

> 해당 EndPoint가 제공하는 Data 중, Client 개발자는 선택적으로 Data를 가져올 수 있습니다.

또한 2가지 이상의 요청도 가능합니다!

```
query{
	accounts {
		id
		username
		email
	}
	# 특정 ID의 정보를 가져오는 Query
	account(id : "1") {
		id
		username
		email
  	}
}
```

위 요청은 accounts의 정보 중 id , username, email과 1번 사용자의 정보를 가져와 달라는 로직입니다. 즉, 기존 REST에서는 2번 요청했어야할 데이터를 1번으로 축소하여 가져올 수 있습니다.

> 추가적으로 query는 생략해도 정상적으로 작동합니다 !

```
{
  accounts {
    id
    username
    email
  }
}
```

만약 동일한 구조의 데이터를 2번이상 호출할 경우, 조금더 명확히 보기 위해 Aliases를 제공합니다 .

```
query{
	accounts {
		id
		username
		email
	}
	# 특정 ID의 정보를 가져오는 Query
	myUser : account(id : "1") {
		id
		username
		email
  	}
}
```

> 11.24 추가

또 한가지 강력한 사용법(?)이 존재했는데, 바로 변수를 사용할 수 있다는 점 입니다.

```
query selectUser($check : Boolean! , $id : Int!){
  	accounts { 
  		id
  		username
		email
  	}
  	myUser : account(id : $id) {
		id
		username
		email
  	}
} 
{
  "id" : 1,
  "check" : true
}
```

위와같이 보낼 경우, $id 부분에 아래의 ‘1’이 들어가게 되며, 매번 query를 새로 작성할 필요없이 변수만 대입하는 형식으로 query를 작성할 수 있습니다.

만약 동적으로 데이터를 선택해야 할 경우, skip 과 include를 사용할 경우 우아한 query를 작성할 수 있습니다.

```
query selectUser($check : Boolean! , $id : Int!){
  	accounts { 
  		id
  		username
		email
  	}
  	myUser : account(id : $id) {
		id
		username @skip(if : $check)
		email
  	}
} 
{
  "id" : 1,
  "check" : true
}
```

의미 그대로, 해당 데이터를 skip 할 것인지, include할 것인지를 동적으로 결정할 수 있습니다.

추가적으로 GraphQL 7.0 부터는 @export 라는 속성을 통해 query의 결과값을 다른 query에 넣는 기능을 지원할 예정이라고 합니다. 이는 공식 Spec은 아니고 몇몇 언어에 대해서만 지원하고 있는 기능입니다.

> 현재 GraphQL 의 버전은 6.0 입니다.



#### Mutation

Mutation은 Query와 다르게 생략이 불가능하며, 일반적으로 Data를 수정하는 역할을 진행합니다. HTTP와 달리 Delete, Put 등으로 나누지 않고 Mutation 내부에 구현한 함수로 해당 역할을 수행합니다.

다음과 같이 사용됩니다.

```
mutation{
  createAccount(username : "JCW" ,email : "email") {
    id
    username 
    email
  }
}
```

> 해당 예제에서는 createAccount함수의 반환값이 Account (일종의 Object)이기에 세부 Type을 명시했습니다.

Mutation은 Server측에서 제공하는 함수를 이용해서 Data를 조작하는 기능을 제공합니다.

> API 서버에서 사용자가 직접 Data를 수정하는 일은 빈번하지 않다고 생각하여, 해당 부분에 대해서는 깊게 학습하진 않았습니다. 간단한 컨셉정도만 학습을 진행했습니다.



추가적으로 Server 측에서 Schema를 구성하는 방법에는 2가지, 언어를 통한 구현과 별도의 파일에서 구현하는 방법(IDL)이 존재합니다.

> 언어로 구현하는 방법

```
GraphQLObjectType fooType = newObject()
.name("Account")
.field(newFieldDefinition()
        .name("id")
        .type(GraphQLString))
.build();
```

> IDL 을 이용한 방법

```
type Account {
    id : String
}

type Query { 
	hotTopic : [Topic]
    categoryTopic : [Topic]
}
```

(+)

GraphQL의 간단한 Flow를 설명하자면 다음과 같습니다.

Server는 요청을 받으면 해당 요청의 유효성 검사를 진행합니다. 해당 함수 및 인자를 지원하는가를 판단하고, 지원 할 경우 함수를 실행하여 결과를 반환하게 됩니다.

GraphQL-java 의 진행과정은 request-> **parse** -> **validate** -> run -> response 입니다.

> 아마 다른 언어의 lib도 비슷한 흐름으로 구현되어 있을거라 생각합니다.

개발을 진행하면서 느꼇던 문제점은 parse / validate 단계로 인해 기존 REST보단 추가적인 동작을 요구하게 된다는 것이였습니다. 때문에 동일한 환경과 데이터에 대해서 REST보다 성능이 떨어질 거라 생각했습니다.



#### GraphQL의 단점

하나하나 설명하기보다 간략하게 한줄씩 작성을 해봤습니다.

```
Streaming 의 부재 - java Lib만의 문제 일 수 있음
Language별 스펙이 각기 다름
GraphQL 관련 설정이 추가적으로 필요 
HTTP 설계에 적합하다고 볼 수 있을까 ? (에러가 발생할 경우, 200으로 통신)
(HTTP Cache와 함께 사용될 수 있을까 ?)
```

#### 개인적으로 했던 오해

##### graphQL을 사용하면 SSE 등의 spec을 사용하지 못할 것이다.

간단하게 개념들을 학습하고 Servelt 위주의 몇가지 예제를 사용해보면서, Spring과 함께 사용할 수 없다고 생각했습니다. 제가 접한 예제들이 별도의 서블릿을 상속받아 진행하는 예제였기에 독립적으로 사용해야될거라 예상했습니다. 꽤나 잘못된 생각이였고 현재 GraphQL과 Spring을 사용하여 구현을 끝마쳤습니다. 

> GraphQL은 Lib가 아닌 하나의 Spec이며, 다양한 언어들로 구현되어있습니다.
> 또한 Spring 환경에서도 사용 가능합니다.

##### Query는 자동적으로 Batch 처리를 해준다.

GraphQL을 학습하면서 읽은 글 중에 다음과 같은 글이 있었습니다.

```
Query는 Batch가 가능하며, Mutation은 Batch가 불가능하다.    
```

해당 글을 읽고, Query 는 Default로 Batch를 지원할거라 생각하고 테스트를 진행해본 결과 Batch가 적용되지 않았습니다. 관련해서 글을 찾아보니, Query는 Batch를 적용할 수 있지만, Mutation은 적용이 불가능하다. 라는 걸 알 수 있었습니다.

즉, 제가 직접 비동기 코드를 적용하거나 다른 Lib를 사용해서 Batch를 구현해야합니다. (Query에 한해서)

> Mutation은 데이터의 변경을 유발하기에 순차적으로 작동한다고 합니다.

[Combining multiple GraphQL queries or mutations in one request](https://www.graph.cool/docs/faq/graphql-combining-multiple-queries-and-mutations-cahzai2eur/)

#### 참고

[Basics Tutorial - Introduction](https://www.howtographql.com/basics/0-introduction/)



#### GraphQL or RESTful?

그렇다면 GraphQL 과 RESTful 중 어떤 것을 선택해서 사용해야하는가?
다음과 같은 기준으로 선택하면 될 것이다.

1. GraphQL
   - 서로 다른 모양의 다양한 요청들에 대해 응답할 수 있어야 할 때
   - 대부분의 요청이 CRUD(Create-Read-Update-Delete) 에 해당할 때
2. RESTful
   - HTTP 와 HTTPs 에 의한 Caching 을 잘 사용하고 싶을 때
   - File 전송 등 단순한 Text 로 처리되지 않는 요청들이 있을 때
   - 요청의 구조가 정해져 있을 때

그러나 더 중요한 것은, **둘 중 하나를 선택할 필요는 없다**는 것이다.



## GraphQL 과 RESTful 의 차이점

GraphQL 을 통한 API 는 RESTful API 와는 다른 측면을 보인다.

1. GraphQL API 는 주로 하나의 Endpoint 를 사용한다.
2. GraphQL API 는 요청할 때 사용한 Query 문에 따라 응답의 구조가 달라진다.

#### API 의 Endpoint

위에서 말했듯 RESTful API 는 Resource 마다 하나의 Endpoint 를 가지고,
그 Endpoint 에서 그 Resource 에 대한 (거의) 모든 것을 담당한다.
반면, GraphQL 은 전체 API 를 위해서 단 하나의 Endpoint 만을 사용한다.

다음의 Github API v3 과 v4 이 좋은 예시가 될 것이다.

- [Github API v3](https://developer.github.com/v3)
- [Github API v4](https://developer.github.com/v4)

각각 [v3 root endpoint](https://developer.github.com/v3/#root-endpoint) 와 [v4 root endpoint](https://developer.github.com/v4/guides/forming-calls/#the-graphql-endpoint) 로 Endpoint 를 제공하지만,
v4 의 경우 Root endpoint 를 제외한 어떤 Endpoint 도 없는 반면,
v3 의 경우는 각 Resource 마다 수많은 Endpoint 들을 제공한다.



#### GraphQL vs RESTful

이런 차이로 인해 생기는 장단점은 무엇이 있는가?

GraphQL 은 다음과 같은 장점을 가진다.

1. HTTP 요청의 횟수를 줄일 수 있다.
   - RESTful 은 각 Resource 종류 별로 요청을 해야하고, 따라서 요청 횟수가 필요한 Resource 의 종류에 비례한다.
     반면 GraphQL 은 원하는 정보를 하나의 Query 에 모두 담아 요청하는 것이 가능하다.
2. HTTP 응답의 Size 를 줄일 수 있다.
   - RESTful 은 응답의 형태가 정해져있고, 따라서 필요한 정보만 부분적으로 요청하는 것이 힘들다.
     반면 GraphQL 은 원하는 대로 정보를 요청하는 것이 가능하다.

두 장점을 예시를 통해 알아보자.
우리가 글의 목록과 각 글에 쓰인 댓글의 목록을 가져올 수 있는 API 가 있다고 해보자.
이 API 가 RESTful 하게 작성되었다면 글과 댓글의 목록을 가져오기 위해서 다음 중 한 가지 방법을 선택해야 할 것이다.

1. 글의 목록을 가져오는 Endpoint 와 댓글의 목록을 가져오는 Endpoint 에 각각 요청을 여러 번 한다.
   글이 5 개 있다고 해보자.
   이 경우에는 글의 목록을 가져오는 Endpoint 에 요청을 하고,
   각 글마다 댓글의 목록을 가져오는 Endpoint 에 요청을 5 번 해야 글과 댓글의 목록을 모두 가져올 수 있을 것이다. (1. 장점)
2. 글의 목록을 가져오는 Endpoint 의 응답에 댓글의 목록을 포함한다.
   글이 5 개 있다고 해보자.
   이 경우에는 글의 목록을 가져오는 Endpoint 에 요청을 1 번 하면 끝이지만,
   글의 목록만 가져와야 하는 경우나 몇몇 글의 댓글만 가져와야 하는 경우가 있다면
   필요한 정보에 비해서 응답의 크기가 쓸데없이 큰 경우가 발생할 것이다. (2. 장점)
3. 글의 목록을 가져오는 요청에 조건을 달아서 댓글의 목록을 포함할 수도, 포함하지 않을 수도 있게 한다.
   API 에 Endpoint 가 많을 경우, API 를 만드는 것이 점점 더 복잡해지고,
   결국 Facebook 에서 GraphQL 을 만든 이유와 비슷한 상황에 처하게 된다.

반면 같은 API 를 GraphQL 로 작성하였다면

1. 글의 목록만을 가져와야 할 경우에는 글의 목록만을 가져오는 Query 를 작성하여 서버에 요청을 보낸다.
2. 글의 목록과 댓글을 모두 가져와야 할 경우에는 글의 목록과 댓글을 모두 가져오는 Query 를 작성하여 서버에 요청을 보낸다.

등을 할 수 있다.

또한, 거기다가 REST 방식과는 다르게 프로토콜 의존적이지 않기 때문에 구현에 따라 HTTP 프로토콜이 아닌 다른 프로토콜 위에서도 동작할 수 있기도 하다.

그렇다면 GraphQL 은 장점만 가지는가? 물론 단점도 있다.
GraphQL 은 다음과 같은 단점을 가진다.

1. File 전송 등 Text 만으로 하기 힘든 내용들을 처리하기 복잡하다.
2. 고정된 요청과 응답만 필요할 경우에는 Query 로 인해 요청의 크기가 RESTful API 의 경우보다 더 커진다.
3. 재귀적인 Query 가 불가능하다. (결과에 따라 응답의 깊이가 얼마든지 깊어질 수 있는 API 를 만들 수 없다.)

물론 GraphQL 에서 File 전송을 할 수 없는 것은 아니나,
일반적인 GraphQL API 에 비해서 복잡해지거나 외부의 Service 에 의존해야하는 등 문제가 발생한다.

#### GraphQL and RESTful!

File 전송과 같이 RESTful 이 더 유리한 API 가 있을 수 있고,
다양한 정보를 주고받는 것 같이 GraphQL 이 더 유리한 API 가 있을 수 있다.

이럴 때 둘 중 하나만 선택해야할 필요는 없다.
하나의 Endpoint 를 GraphQL 용으로 만들고,
다른 RESTful endpoint 들을 만들어 놓는 것은 API 개발자의 자유다.
주의해야할 것은 하나의 목표를 위해 두 API structure 를 섞어놓는 것은 API 의 품질을 떨어트릴 수 있다는 점이다.
(예: 사용자 정보를 등록하는 것은 RESTful API 로, 사용자 정보를 수정하는 것은 GraphQL API 로 한다면 끔찍할 것이다.)



## 결론

GraphQL 은 여러 장점을 가지고 Server 의 구조를 단순화 시켜줄 수 있는 좋은 Query Language 이다.
다만, GraphQL 의 장점이 언제나 의미를 가지는 것은 아니며, 어떤 조건에서 사용하는지, 어떤 목표로 사용하는지에 따라서
장점으로 작용하기도, 단점으로 작용하기도 한다.
훌륭한 API 개발자가 되기 위해서는
이런 장단점을 잘 파악하여 GraphQL 만 쓸 것인지,
RESTful structure 또한 사용할 것인지,
혹은 RESTful structure 만 사용할 것인지를 결정하는 것이 중요하다.

알려진 지 오래된 기술요소는 아니기 때문에 아직은 대용량에 대한 성능 이슈나 불필요한 DB 호출 등의 단점들도 언급되고 있어 향후 조금 더 다양한 래퍼런스가 있어야할 것으로 보임. 하지만 여러 서비스를 의. API를 통합하는 MSA에 대한 대응 측면이나, 복잡하고 반복적으로 발생되는 API의 대한 효율적인 정리 등 활용에 대한 방안에 대해 많은 기대를 가질 수 있음.



여러번 반복해서 가져오는 api의 엔드포인트를 합쳐줌으로 코드가 보다 깔끔해주고 언더페치와 오버페치를 해결할 수 있음

