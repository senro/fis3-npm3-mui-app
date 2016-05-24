var $=require('egis-jquery');
var routerCallbacks={};

/*首页*/
routerCallbacks.main=function(){
    require('components/main/main').render();
};
/*系统管理*/
routerCallbacks.userManage=function(){
    require('components/systemManage/userManage/userManage').render();
};
routerCallbacks.roleManage=function(){
    require('components/systemManage/roleManage/roleManage').render();
};
routerCallbacks.logManage=function(){
    require('components/systemManage/logManage/logManage').render();
};
/*业务管理*/
routerCallbacks.appManage=function(){
    require('components/businessManage/appManage/appManage').render();
};
    routerCallbacks.addApp=function(){
        require('components/businessManage/appManage/addApp').render();
    };
routerCallbacks.bindQuery=function(){
    require('components/businessManage/bindQuery/bindQuery').render();
};
    routerCallbacks.checkDevice=function(){
        require('components/businessManage/bindQuery/checkDevice').render();
    };
routerCallbacks.unbindRecord=function(){
    require('components/businessManage/unbindRecord/unbindRecord').render();
};
routerCallbacks.accountManage=function(){
    require('components/businessManage/accountManage/accountManage').render();
};
    routerCallbacks.accountDetail=function(){
        require('components/businessManage/accountManage/accountDetail').render();
    };
routerCallbacks.authQuery=function(){
    require('components/businessManage/authQuery/authQuery').render();
};
    routerCallbacks.authQueryDetail=function(){
        require('components/businessManage/authQuery/authQueryDetail').render();
    };
routerCallbacks.strategyManage=function(){
    require('components/businessManage/strategyManage/strategyManage').render();
};
    routerCallbacks.addStrategy=function(){
        require('components/businessManage/strategyManage/addStrategy').render();
    };
routerCallbacks.billingQuery=function(){
    require('components/businessManage/billingQuery/billingQuery').render();
};
/*二次认证管理*/
routerCallbacks.authManage=function(){
    require('components/authManage').render();
};
/*开发者中心*/
routerCallbacks.devCenter=function(){
    require('components/devCenter').render();
};
/*报表中心*/
routerCallbacks.authStats=function(){
    require('components/tableCenter/authStats').render();
};
routerCallbacks.accountStats=function(){
    require('components/tableCenter/accountStats').render();
};
routerCallbacks.deviceStats=function(){
    require('components/tableCenter/deviceStats').render();
};
module.exports=routerCallbacks;