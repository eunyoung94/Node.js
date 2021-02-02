var http=require("http"); //웹서버 모듈 가져오기 
var fs =require("fs"); //파일 시스템 객체 (파일에 대한 입출력 처리 )
var mysql=require("mysql"); //mysql외부모듈가져오기 
const { RSA_NO_PADDING } = require("constants");

var server = http.createServer(function(request,response){

    
    
    console.log("클라이언트의 요청url",request.url);
    console.log("클라이언트의 요청method",request.method);
    //입력양식폼을 요청하면 
    if(request.url="rest/board/form"&&request.method=="GET"){
        fs.readFile("./main.html","utf-8",function(error,data){ 
            response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
            response.end(data);//응답 정보중 body를 구성한다 
        });
    }else if(request.url="/rest/board"&&request.method=="GET"){ //목록요청처리 /rest/baord GET방식
       //mysql연동 
       let con=mysql.createConnection({
           url:"localhost",
           user:"root",
           password:"1234",
           database:"android"
        });
        var sql ="select * from board order by board_id desc";
        con.query(sql,function(error,record,fields){
            if(error){
                response.writeHead(500,{"Content-Type":"application/json;charset=utf-8"});
                response.end("목록가져오기 error");
            }else{
                console.log("데이터베이스의 레코드는?",record);
                response.writeHead(200,{"Content-Type":"application/json;charset=utf-8"});
                response.end(JSON.stringify(record)); //string화 시켜서 전송 
            }

         });
       

    }else if(request.url="/rest/board/25"&&request.method=="GET"){ //상세내용 /rest/board/45
        
    }else if(request.url="/rest/board"&&request.method=="POST"){//등록  /rest/board POST
        //클라이언트의 전송 파라미터(json)을 받자
        request.on("data",function(param){ 
            console.log("클라이언트가 post로 전송한 데이터는? ",param);
        });

    }else if(request.url="/rest/board"&&request.method=="PUT"){ //수정  /rest/board PUT
        
    }else if(request.url="/rest/board/45"&&request.method=="DELETE"){ //삭제  /rest/board PUT
        
    }
  

});

/*접속자 감지 
/Node.js프레임웍이 지원되지만 오늘은 아무런 지원없이 개발 
server.on("connection",function(){ 
    console.log("클라이언트 요청 감지");
});
*/

server.listen(7777,function(){ 
    console.log("Server is running 7777..");

});