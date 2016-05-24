var jQuery = require('egis-jquery');
var template=require('egis-template');
var $container = jQuery('#offCanvasSide');

function render() {
    $container.html(__inline('./navigation.html'));

    mui.init();

    //主界面和侧滑菜单界面均支持区域滚动；
    mui('#offCanvasSideScroll').scroll();
    mui('#offCanvasContentScroll').scroll();

}

module.exports={
    render:render
};
