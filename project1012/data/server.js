/*
http 모듈을 이용하면, 단 몇줄만으로도 웹서버를 구축할 수 있다. 
*/
var http=require("http");//모듈가져오기!
//http모듈안에서 지원하는 서버 객체 생성
http.createServer();
var server=http.createServer();

//접속자가 들어오는지 확인해본다 
server.on("connect",function(){
    console.log("접속자발견");
});
//서버가동 (포트번호 지정)
server.listen(8989,function(){ 
    console.log("My server is running at 8989");
});