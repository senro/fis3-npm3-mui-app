/**
 * header 标签中的内容
 */
var $ = require('egis-jquery');
require('egis-bootstrap')();
var doGenTsc=require('egis-tsc').doGenTsc;
var ajax=require('egis-ajax').ajax;
//var utilUser = require('components/util/utilUser');
var $header = $('header');
var cookie=require('egis-cookie');
var userObj= JSON.parse(cookie('get','userObj'));

function render(){
    $header.html(__inline("./header.html"));

    //显示用户名
    $('.header-item-userName').html(userObj.username);
    //绑定时空令
    $('.header-item-bind').click(function(){
        $('#modal-bindQRcode').modal('show');
        return false;
    });
    //生成绑定码
    var tsctype = '000';//for bind
    var systemNo=window.systemNo;
    ajax(window.apiHost+'getExternalId?type='+tsctype,null,function(data){
        var externalId = data.externalId;
        var appId = window.appId;
        var appKey = window.appKey;

        doGenTsc(appId, externalId, tsctype, appKey, {
                id:'qrcodeCanvas',
                width:180,
                height:180,
                useFakeDid:true,
                didInitJsUrl:window.didInitJsUrl,
                didRequestUrl:window.didRequestUrl,
                syncTimeUrl:window.syncTimeUrl,
                userBindUrl:window.userBindUrl
            }
        );
        //startWebsocketConn();//启动websocket监听
    });
    //生成二维码结束

    function startWebsocketConn(){
        if('WebSocket' in window){
            websocket = new WebSocket(window.websocketUrl);
        }else if('MozWebSocket' in window){
            websocket = new MozWebSocket(window.websocketUrl);
        }else{
            alert("您的浏览器不支持WebSocket,请更换最新版本浏览器");
            return;
        }
        websocket.onopen = function (evnt) {
            var t = new Date().getTime();
            var sig = "scanType="+tsctype+"&systemAccount="+"dyswwo@126.com"+"&systemNo="+systemNo+"&t=" + t + "&x-hmac-auth-date=" + t;
            var sigE = window.tscSdkObj.p_appId + ":" + window.tscSdkObj.sig(sig);
            var msg = '{"scanType":"'+tsctype+'","systemAccount":"dyswwo@126.com","systemNo":"'+ systemNo+'","x-hmac-auth-date":"'+ t+'","x-hmac-auth-signature":"'+sigE+'"}';
            msg=encodeURIComponent(msg);
            websocket.send(msg);
        };

        websocket.onmessage = function (evnt) {
            var res = eval("(" + evnt.data + ")");
            if(res.status != '10003' && res.status!='10001'){//返回值10003:等待中, 10001:校验失败或者已过期
                if(res.status == '0'){
                    //消息推送完成后，切换到等待确认界面 扫码成功 todo
                    //console.log("扫码成功");
                    $('#modal-bindQRcode').modal('hide');
                }else{
                    //扫码失败
                    //console.log('扫码失败');
                }
            }
        };
        websocket.onerror = function (evnt) {

        };
        websocket.onclose = function (evnt) {
            //alert('connection closed');
            startWebsocketConn();
        }
    }
}

//var $logout = $('#accountInfoBox').find('.logout');
//utilUser.logout($logout);
module.exports={
    render:render
};