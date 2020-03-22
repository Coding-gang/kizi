
var a = 'global';
function f(){
  var a = 'local';
  console.log(a);
  return a;
}
f();
console.log(a);




var square = function sq(x){
  return x*x;
}

console.dir(
  square
)

function Card (suit, rank){
  this.suit = suit;
  this.rank = rank;
}

var card1 = new Card('하트','A');
var card2 = new Card('클럽','K');
var card3 = new Card('스페이드','2');

console.log(card2);

function Circle(center, radius){
  this.center = center;
  this.radius = radius;
  this.area = function(){
    return Math.PI * this.radius * this.radius;
  }
}

var p = {x:0, y:0};
var c = new Circle(p,2.0);
console.log('넓이 = '+c.area());


// var start = new Date();
// console.log(start.getTime())
// var end = new Date(2019,03,13);

// console.log(end-start)



let now = new Date();
let end = new Date(`2019-03-14 15:00`);
//타이머 형식 2019-
let timeConfig = {
  start:`now`,
  end:'2019-03-14 15:00'
}

tid=setInterval('msg_time()',1000); // 타이머 1초간격으로 수행

var stDate = new Date().getTime();
var edDate = new Date('2018-10-25 24:00:00').getTime(); // 종료날짜
var RemainDate = edDate - stDate;
 
function msg_time() {
  var hours = Math.floor((RemainDate % (1000 * 60 * 60 * 24)) / (1000*60*60));
  var miniutes = Math.floor((RemainDate % (1000 * 60 * 60)) / (1000*60));
  var seconds = Math.floor((RemainDate % (1000 * 60)) / 1000);
  
  m = hours + ":" +  miniutes + ":" + seconds ; // 남은 시간 text형태로 변경
  
  document.all.timer.innerHTML = m;   // div 영역에 보여줌 
  
  if (RemainDate < 0) {      
    // 시간이 종료 되었으면..
    clearInterval(tid);   // 타이머 해제
  }else{
    RemainDate = RemainDate - 1000; // 남은시간 -1초
  }
}


console.log(now.getTime());
console.log(end.getTime())


let abb = ['a','b','c'];

for( var i in abb) console.log(i);


if( 1 + 2 -2){
  console.log('hello')
}


var agd =2;
var ggf = ++agd +2;
console.log(ggf)
console.log(agd);


console.log(
  'sdgsgsd'.includes('svgd',4)
)

'dfhdfh'.normalize();

document.getElementById('hello').addEventListener('submit',function(e){
  e.preventDefault();
  console.log(this.name.value)
  console.log(this.name.value.normalize('NFD'))
})