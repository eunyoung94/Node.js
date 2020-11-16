/*
Node.js가 전세계적으로 열풍을 일으킨 이유는?
가장 큰 이유가, 바로 모듈때문이다. 

모듈이란? 자바스크립트 라이브러리를 파일로 저장해놓은 단위, 
node.js 모듈의 특징: 전세계 많은 개발자들이 각자 자신이 개발한 모듈을 공유하고있다. 따라서 지금 이 순간에도 새로운 모듈이 계속 
추가되고있다.

모듈의 유형
1) 내장모듈
    -os 모듈
    -url 모드 
    -file system 모듈 (★★★)
2) 사용자 정의 모듈
*/
// 자바스크립트와는 달리, 모듈을 가져올때는 require()함수를 이용해야한다. 
// var os= require("os"); // 이미 내장된 모듈 중 os 모듈을 가져오기.
// console.log(os.hostname());
// console.log(os.cpus());//cpu정보
// url모듈: url의 정보를 분석해주는 모듈 
 var url=require("url");
 //url을 분석하여, 그결과를 result변수에 담아놓자
 var result=url.parse("https://terms.naver.com/search.nhn?query=car");
 console.log("검색어는 ",result.query);