var Router=require('egis-director').Router;
var routerCallbacks=require('./routerCallbacks');

//定义路由
var route = {
    /*首页*/
    "/main":routerCallbacks.main,
    /*系统管理*/
    //用户管理
    "/systemManage/userManage":routerCallbacks.userManage,
    //角色管理
    "/systemManage/roleManage":routerCallbacks.roleManage,
    //日志管理
    "/systemManage/logManage":routerCallbacks.logManage,
    /*业务管理*/
    //应用管理
    "/businessManage/appManage":routerCallbacks.appManage,
        //新增应用
        "/businessManage/appManage/addApp":routerCallbacks.addApp,
    //绑定查询
    "/businessManage/bindQuery":routerCallbacks.bindQuery,
        //查看设备
        "/businessManage/bindQuery/checkDevice":routerCallbacks.checkDevice,
    //解绑记录
    "/businessManage/unbindRecord":routerCallbacks.unbindRecord,
    //账号管理
    "/businessManage/accountManage":routerCallbacks.accountManage,
        //账号详情
        "/businessManage/accountManage/accountDetail":routerCallbacks.accountDetail,
    //认证查询
    "/businessManage/authQuery":routerCallbacks.authQuery,
        //认证查询详情
        "/businessManage/authQuery/authQueryDetail":routerCallbacks.authQueryDetail,
    //策略管理
    "/businessManage/strategyManage":routerCallbacks.strategyManage,
        //新增策略
        "/businessManage/strategyManage/addStrategy":routerCallbacks.addStrategy,
    //计费服务查询
    "/businessManage/billingQuery":routerCallbacks.billingQuery,
    /*二次认证管理*/
    "/authManage":routerCallbacks.authManage,
    /*开发者中心*/
    "/devCenter":routerCallbacks.devCenter,
    /*报表中心*/
    //认证统计
    "/tableCenter/authStats":routerCallbacks.authStats,
    //账号统计
    "/tableCenter/accountStats":routerCallbacks.accountStats,
    //设备统计
    "/tableCenter/deviceStats":routerCallbacks.deviceStats

};

//初始化路由
var router =Router(route).configure({
    notfound:function(){
        window.location.href='/';
    }
});
function init(){
    router.init();
}
module.exports=init;