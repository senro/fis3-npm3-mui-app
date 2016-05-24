var $=require('egis-jquery');
var ajax = require('components/util/ajax').ajax;
//判断是否登录
if(!window.location.hash){
    window.location.hash ='#/main';
}
//ajax(window.apiHost+'appManage/getAllStrategyInfo',null,function(data){
//    //已登陆,根据路由进行跳转
//    if(!window.location.hash){
//        window.location.hash ='#/main';
//    }
//
//},null,null,'get');