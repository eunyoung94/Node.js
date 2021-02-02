//사용자 정의 모듈 
/*
module.exports.getMsg = function(){
    return "hahaha";
}
*/
//객체를 모듈로 정의 
var formatter ={
    getCurrency:function(){
        return 5000;
    },
    getLocale:function(){
        return"korea";
    }
};
module.exports=formatter;