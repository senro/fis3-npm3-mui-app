var $ = require('egis-jquery'),
    xhr = require('egis-xhr'),
    jsonGet = xhr.json,
    jsonPost = xhr.jsonpost,
    apiHost = window.apiHost,
    cookie = require('egis-cookie'),
    jsonstringfy = require('egis-util').JSON_stringify,
    systemMessage = require('egis-system-message');


var User = {
    //loginCookieName: 'userObj',
    //loginInfo: {},
    //
    //start: function () {
    //    var $loginInfo = cookie('get', this.loginCookieName);
    //    if (!$loginInfo) {
    //        this.login();
    //
    //        return true;
    //    }
    //
    //    this.loginInfo = $.parseJSON($loginInfo);
    //},
    //
    //login: function () {
    //    window.location.href = 'login.html';
    //},
    //
    //logout: function ($button) {
    //    var $user = this;
    //
    //    $button.on('click', function () {
    //        var $that = $(this);
    //
    //        $.ajax($.extend({
    //            url: apiHost + 'logout.do',
    //            beforeSend: function () {
    //            }
    //        }, jsonPost)).
    //            done(function (data) {
    //                if (data.status == 1) {
    //                    cookie('del', this.loginCookieName);
    //                    $user.login();
    //                } else {
    //                    systemMessage.alert(data.detail || '退出失败，请重试！');
    //                }
    //            }).fail(function () {
    //                systemMessage.error('退出失败，请重试！')
    //            }).
    //            always(function () {
    //            });
    //    });
    //},
    authoritiesDictionary:function(name){
        switch (name){
            case  '首页':
                return 'main';
                break;
            case  '系统管理':
                return 'systemManage';
                break;
            case  '用户管理':
                return 'userManage';
                break;
            case  '角色管理':
                return 'roleManage';
                break;
            case  '日志管理':
                return 'logManage';
                break;
            case  '业务管理':
                return 'businessManage';
                break;
            case  '应用管理':
                return 'appManage';
                break;
            case  '绑定查询':
                return 'bindQuery';
                break;
            case  '解绑记录':
                return 'unbindRecord';
                break;
            case  '账号管理':
                return 'accountManage';
                break;
            case  '认证查询':
                return 'authQuery';
                break;
            case  '策略管理':
                return 'strategyManage';
                break;
            case  '计费查询':
                return 'billingQuery';
                break;
            case  '二次认证管理':
                return 'authManage';
                break;
            case  '开发者中心':
                return 'devCenter';
                break;
            case  '报表中心':
                return 'authStats';
                break;
            case  '认证统计':
                return 'authStats';
                break;
            case  '账号统计':
                return 'accountStats';
                break;
            case  '设备统计':
                return 'deviceStats';
                break;
        }
    },
    getAuthoritiesNavInfo:function(name){
        var obj=[
            {
                text:'首页',
                href:'#/main',
                show:false,
                iconClass:'nav-icon-index'
            },
            {
                text:'系统管理',
                href:'#/systemManage/userManage',
                show:true,
                iconClass:'nav-icon-systemManage',
                include:[
                    {
                        text:'用户管理',
                        show:true,
                        href:'#/systemManage/userManage'
                    },
                    {
                        text:'角色管理',
                        show:true,
                        href:'#/systemManage/roleManage'
                    },
                    {
                        text:'日志管理',
                        show:true,
                        href:'#/systemManage/logManage'
                    }
                ]
            },
            {
                text:'业务管理',
                href:'#/businessManage/appManage',
                show:true,
                iconClass:'nav-icon-businessManage',
                include:[
                    {
                        text:'应用管理',
                        show:true,
                        href:'#/businessManage/appManage'
                    },
                    {
                        text:'绑定查询',
                        show:true,
                        href:'#/businessManage/bindQuery'
                    },
                    {
                        text:'解绑记录',
                        show:true,
                        href:'#/businessManage/unbindRecord'
                    },
                    {
                        text:'账号管理',
                        show:true,
                        href:'#/businessManage/accountManage'
                    },
                    {
                        text:'认证查询',
                        show:true,
                        href:'#/businessManage/authQuery'
                    },
                    {
                        text:'策略管理',
                        show:true,
                        href:'#/businessManage/strategyManage'
                    },
                    {
                        text:'计费查询',
                        show:true,
                        href:'#/businessManage/billingQuery'
                    }
                ]
            },
            {
                text:'二次认证管理',
                href:'#/authManage',
                show:false,
                iconClass:'nav-icon-authManage'
            },
            {
                text:'开发者中心',
                href:'#/devCenter',
                show:false,
                iconClass:'nav-icon-devCenter'
            },
            {
                text:'报表中心',
                href:'#/tableCenter/authStats',
                show:false,
                iconClass:'nav-icon-tableCenter',
                include: [
                    {
                        text:'认证统计',
                        show:true,
                        href:'#/tableCenter/authStats'
                    },
                    {
                        text:'账号统计',
                        show:true,
                        href:'#/tableCenter/accountStats'
                    },
                    {
                        text:'设备统计',
                        show:true,
                        href:'#/tableCenter/deviceStats'
                    }
                ]
            }
        ];
        //var User=this;
        //var authorities=User.getAuthorities();
        //
        ////通过权限配置菜单显示表
        //if(authorities&&authorities.length>0){
        //    for(var i=0;i<authorities.length;i++){
        //        var authoritedNavName=User.authoritiesDictionary(authorities[i].authority);
        //        for(var navName in obj){
        //            if(authoritedNavName==navName){
        //                obj[authoritedNavName].show=true;
        //            }else if(obj[navName].include){
        //                for( subNavName in obj[navName].include){
        //                    if(subNavName==authoritedNavName){
        //                        obj[navName].include[authoritedNavName].show=true;
        //                    }
        //                }
        //            }
        //        }
        //    }
        //}else{
        //    //alert('权限设置有问题：'+jsonstringfy(authorities));
        //    window.location.href='login.html';
        //}
        //
        ////通过权限配置菜单跳转链接
        //
        //for(var navName in obj){
        //    if(obj[navName].include){
        //        var subMenu=[];
        //        for( subNavName in obj[navName].include){
        //            if(obj[navName].include[subNavName].show&&obj[navName].href==''){
        //                //默认设置跳转到子菜单的第一个
        //                obj[navName].href=obj[navName].include[subNavName].href;
        //            }
        //            subMenu.push(obj[navName].include[subNavName].href);
        //        }
        //        obj[navName]['subMenu']=subMenu.join(',');
        //    }
        //}

        return obj;
    }
    //setName: function ($name) {
    //    this.loginInfo.name = $name;
    //    cookie('del', this.loginCookieName);
    //    //console.log(this.loginInfo);
    //    this.saveUserInfo(jsonstringfy(this.loginInfo));
    //},
    //
    //setMobile: function ($mobile) {
    //    this.loginInfo.mobile = $mobile;
    //    this.saveUserInfo(jsonstringfy(this.loginInfo));
    //}


};

//User.start();

return User;