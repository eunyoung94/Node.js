/*프로그램 개발시 전반적으로 */


//메시지 출력후 URL재접속 

exports.getMsgURL=function(msg, url){
    var tag="<script>";
    tag+="alert('"+msg+"');";
    tag+="location.href='"+url+"';";
    tag+="</script>";

    return tag;
}