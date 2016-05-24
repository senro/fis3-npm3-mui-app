var $=require('egis-jquery');
var authTypeTranslate={
    transStringToJson:transStringToJson,
    transJsonToString:transJsonToString,
    translateObj:translateObj,
    AuthTypeReflect:AuthTypeReflect,
    transKeyToValue:transKeyToValue
};
function transStringToJson(array){
    var newArray;
    var authTypeReflect=AuthTypeReflect();
    newArray=array.map(function(authTypeString){
        var result;
        var tmpObj={};
        if(/\+/.test(authTypeString)){
            var authTypeStringArray=authTypeString.split('+');
            var tempKey=[];
            //'扫一扫+推送确认'=>'{'scan+push':'扫一扫+推送确认'}'
            authTypeStringArray.map(function(authTypeStringArrayItem){
                authTypeReflect.map(function(authTypeReflect){
                    if(authTypeStringArrayItem==authTypeReflect.value){
                        tempKey.push(authTypeReflect.name);
                    }
                });
            });

            tmpObj[tempKey.join('+')]=authTypeString;
            result=tmpObj;
        }else{
            authTypeReflect.map(function(authTypeReflect){
                if(authTypeReflect.value==authTypeString){
                    tmpObj[authTypeReflect.name]=authTypeReflect.value;
                    result=tmpObj;
                }
            });
        }


        return result;
    });

    return newArray;
}
function transJsonToString(array){
    var newArray;
    var authTypeReflect=AuthTypeReflect();
    newArray=array.map(function(authTypeObj){
        authTypeObj=translateObj(authTypeObj);
        var result;
        result = authTypeObj.value;
        return result;
    });

    return newArray;
}
function transKeyToValue(name){
    var result=[];
    var authTypeReflect=AuthTypeReflect();
    if(/\+/.test(name)){
        var nameArray=name.split('+');
        nameArray.map(function(key){
            authTypeReflect.map(function(authType){
                if(authType.name==key){
                    result.push(authType.value);
                }
            });
        });
    }else{
        authTypeReflect.map(function(authType){
            if(authType.name==name){
                result.push(authType.value);
            }
        });
    }
    return result.join('+');
}
function translateObj(obj){
    var result={};
    for(var key in obj){
        result.name=key;
        result.value=obj[key];
    }
    return result;
}
function AuthTypeReflect(){
    return [
        {name:'scan',value:'扫一扫'},
        {name:'push',value:'推送确认'},
        {name:'otp',value:'数字令'},
        {name:'look',value:'看一看'},
        {name:'pin',value:'个人识别号'},
        {name:'msg',value:'安全短信'}
    ];
}

exports.authTypeTranslate=authTypeTranslate;