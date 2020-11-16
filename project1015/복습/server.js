/* url 문자열(urlStr)을 url 객체로 변환하여 리턴합니다.
 parseQueryString과 slashesDenoteHost는 기본값으로 false입니다.

 1. url 모듈
url 모듈은 url 정보를 객체로 가져와서 분석(parse)하거나,
url 객체를 문자열로 바꿔주는 기능(format, resolve)을 수행합니다.

-parseQueryString
query 객체란 query String을 의미하며 url 중에서 '?' 뒷부분을 의미​
true : url 객체의 query 속성을 객체(작용의 대상이 되는 쪽) 형식으로 가져옵니다.(querystring 모듈을 사용합니다.)
false : url 객체의 query 속성을 문자열 형식으로 가져옵니다

express 없이 실행시키기
const ejs = require("ejs");
 ejs.render(경로, 데이터, 옵션);
*/

var http=require("http");
var url=require("url");
var fs=require("fs"); //fs= file system  fs.readFile 란 ? 파일시스템을 읽어오는것.
var mysql=require("mysql");
var ejs=require("ejs");
var qs=require("querystring");
const { RSA_NO_PADDING }=require("constants");
var con;
var urlJson;
// request = 정보를 달라고 요청
// response = 정보를 반환하는것 
var server= http.createServer(function(request,response){
//요청구분
    urlJson=url.parse(request.url,true);
//URL 인터페이스의 pathname 속성은 URL의 경로와 그 앞의 /로 이루어진 USVString을 반환한다. 경로가 없는 경우 빈 문자열을 반환합니다.
    if(urlJson.pathname=="/"){
        fs.readFile("./index.html","utf-8",function(error,data){ 
            if(error){
                console.log("./index.html 파일 읽기실패",error)
            }else{//제대로 읽어온것, response.writeHead ->http 프로토콜의 헤더부분에 쓰겠다.라고해석
                response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
                response.end(data);
            }
        });
    }else if(urlJson.pathname=="member/registForm"){//가입폼을 요청하면 
         registForm(request,response);
    }else if(urlJson.pathname=="/member/regist"){//가입을 요청하면 
        regist(request,response);
    }

function registForm(request,response){
    //보유기술은 DB데이터를 가져와서 반영해야하므로, ejs로 처리해야한다.
    var sql="select * from skill";
    con.query(sql,function(error,record,fields){
        if(error){
            console.log("skill조회실패",error)
        }else{
            console.log("skill record",record);
            //registForm.ejs에게 json배열을 전달하자
            fs.readFile("./registForm.ejs","utf-8",function(error,data){
                response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
                // Response.end 를 사용해서 프로그램의 실행을 중단시킨다.
                // render( 'ejs파일 경로', 'json 형태 데이터');
                response.end(ejs.render(data,{
                     skillArray:record
                }));
            });
        }
    });  
}

function regist(request,response){
    request.on("data",function(param){
        //url모듈에게 파싱을 처리하게 하지말고, querystring 모듈로 처리한다. 
        var postParam=qs.parse(new String(param).toString());
        console.log("postParam : ",postParam);
        var sql="insert into member2(uid,password,uname,phone,email,receive,addr,memo)";
        sql+="values(?,?,?,?,?,?,?,?,?)";//물음표를 바인드 변수라고한다.
        con.query(sql,[
            postParam.uid,
            postParam.password,
            postParam.uname,
            postParam.phone,
            postParam.email,
            postParam.receive,
            postParam.addr,
            postParam.memo,
        ],function(error,fields){
            if(error){
                console.log("등록실패",error);
            }else{
                // 목록페이지 보여주기
                // 등록되었으면 alert()으로 알려주고, /member/list로 재접속
                response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
                var tag="<script>";
                tag+="alert('등록성공');";
                tag+="location.href='member/list'; ";
                tag+="</script>";
                response.end(tag);
            }
        });
    });
}






});


//mysql에 접속하기
function connect(){
    con=mysql.createConnection({
        url:"localhost",
        user:"root",
        password:"1234",
        database:"node"
    });
}

server.listen(7788,function(){
    console.log("server is running at 7788 port...");
    connect();
});