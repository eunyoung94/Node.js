/*
get/post 전송을 이해하기 위한 서버
get: 가져오다 (서버로부터 컨텐츠를 가져올때 사용되는 요청방식)
html <a>링크가 바로 get 방식의 요청이다.
get방식으로 데이터 즉, 파라미터를 전송하게되면 데이터가 노출된다. 
http프로토콜의 헤더에 실어 나르므로..(편지봉투에 데이터를 작성하는것과 같다.)
편지봉투에 데이터를 전송하면 편지지에 비해 전송할 수 있는 데이터량의 한계가 있다..
주용도) 다른 url로 링크를 통해 파라미터 전송할때 주로쓰임..
post: 보내다는 의미(클라이언트가 서버에 데이터를 전송할때 사용하는 방식 )
http 프로토콜의 body를 통해 데이터를 전송하기 때문에 편지지에 데이터를 실어서 보내는것과 같음..
봉투 안에 담아서 보내기 때문에 데이터가 노출되지 않는다. 
특징) 보낼 수 있는 데이터량의 한계가 없다. 
용도) 노출되면 위험한 데이터 전송시 사용한다. (로그인요청, 회원가입 등..)
파일, 사진 및 동영상 등을 서버에 전송시 이용한다. 
post방식은 form태그를 이용해서 요청할 수 있다.
 */
var http=require("http");
var url=require("url");
var querystring=require("querystring");//get,post 까지 파싱이가능

var server =http.createServer(function(request,response){
    // console.log("클라이언트의 요청방식: ", request.method);
    if(request.method=="GET"){
            response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
            response.end("클라이언트가 GET방식으로 요청했네요");
            //get방식으로 전달된 파라미터받기
            var urlJson=url.parse(request.url,true);//true 매개변수를 넘기면, 파라미터 정보를 json으로 변환!
            // console.log("URL분석결과",urlJson);
            var paramJson=urlJson.query;//id,pass가 담겨있다.
            console.log("ID:",paramJson.id);
            console.log("Pass:",paramJson.pass);

    }else if(request.method=="POST"){
        response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
        response.end("클라이언트가 post방식으로 요청했네요");
        //body로 날라온 데이터는 
        //post 방식으로 전달된 데이터를 받기위한 이벤트를 감지해보자..
        request.on("data",function(param){ 
            // var postParam=url.parse(new string(param).toString(),true);
            var postParam=querystring.parse(new String(param).toString());

            console.log("ID:",postParam.id);
            console.log("Pass:",postParam.pass);
            //  console.log("전송된 param",postParam);
         });
    }
});

server.listen(9999,function(){
    console.log("server is running at post9999");
});