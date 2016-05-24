//@require fis-mod

var $=require('egis-jquery');
var ajax=require('components/util/ajax').ajax;
var cookie=require('egis-cookie');
var $submitBtn= $('#btn-login');
var regs=require('egis-validate/regs');

//var rememberUsername=cookie('get','rememberUsername');
//if(rememberUsername){
//    $('#account').val(rememberUsername);
//}

$submitBtn.click(function(){
    var username=$('#account').val();
    var password= $('#password').val();
    if(!$submitBtn.hasClass('disable')){
       if(regs['email'].test(username)){

            window.location.href= window.baseUrl + '/index.html#/main';

            ajax(window.apiHost + 'dologin',{username:username,password:password},function(data){
                //cookie('set','userObj',JSON.stringify({username:username}));
                //if($('.rememberMeCheckbox').hasClass('multiCheckbox_hover')){
                //    cookie('set','rememberUsername',username);
                //}
                window.location.href= window.baseUrl + '/index.html#/main';

            },function(){
                $submitBtn.html('登录中...');
                $submitBtn.addClass('disable');
            },function(){
                $submitBtn.html('登录');
                $submitBtn.removeClass('disable');
            });

        }else{
            mui.toast('请输入正确的邮箱！');
        }
    }
    return false;
});

$(document).keydown(function(e) {
    if (e.keyCode == 13){
        $submitBtn.click();
    }
});

