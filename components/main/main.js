var $ = require('egis-jquery');
var ajax=require('components/util/ajax').ajax;
var template = require('egis-template');
var $container = $('#main');

function render(){
    $container.hide().html(__inline('./main.html')).fadeIn(500);

    $('a').click(function(){
        console.log('click');
        return false;
    });

    //侧滑容器父节点
    var offCanvasWrapper = mui('#offCanvasWrapper');

    //菜单容器
    var offCanvasSide = document.getElementById("offCanvasSide");

    //offCanvasWrapper.offCanvas('show');
    ////主界面‘显示侧滑菜单’按钮的点击事件
    document.getElementById('btn-show-menu').addEventListener('tap', function() {
        offCanvasWrapper.offCanvas('show');
    });
    ////菜单界面，‘关闭侧滑菜单’按钮的点击事件
    document.getElementById('offCanvasHide').addEventListener('tap', function() {
        offCanvasWrapper.offCanvas('close');
    });

    var $searchForm = $('#searchForm');
    var $pageNum = $searchForm.find('input[name=page]'),
        $pageSize = $searchForm.find('input[name=size]'),
        $pagination = $('#pagination');

    /*列表展示*/
    var listRender=template.compile($('#list-tmpl').html());
    $searchForm.on('submit', function (event) {
        var $context = $(this),
            $submit = $context.find('input[type=submit]');

        if (event) {
            event.preventDefault();
        }
        if ($submit.prop("disabled")) {
            return false;
        }

        ajax(
            window.apiHost+'log/getLogList',
            clearEmptyValue($context),
            function (data) {
                var dataObj = data.data || {};

                //$page.find('#listTable').find('tbody').html(listRender(dataObj));

                //分页
                $('#pagination-content').pagination({
                    $form:$context,
                    first: "<<",
                    prev : "<",
                    next : ">",
                    last : ">>",
                    currentPage:$pageNum.val(),
                    pageSize:parseInt($pageSize.val()),
                    totalSize:dataObj.totalElements,
                    //info: true,
                    //infoContainer:'.pagination-wrap',
                    //paginationInfoTpl:
                    //'<div class="pagination-TotalInfo">总条数 '+dataObj.totalElements+' 条</div>'+
                    //'<div class="pagination-info-content">' +
                    //'<input type="text" class="info-currentPage" name="currentPage" />' +
                    //'&nbsp;/&nbsp;'+ dataObj.totalPages +'页&nbsp;&nbsp;' +
                    //'<a href="javascript:;" class="info-goToPage">GO</a>' +
                    //'</div>',
                    visiblePages: 5,
                    onPageClick: function (event, page) {

                        $pageNum.val(page);
                        $context.trigger('submit');
                    }
                });

            },
            function () {
                $submit.prop("disabled", true);          // 禁用
                //$page.find('#listTable').find('tbody').html(listRender({loading:true}));
            },function(){
                $submit.prop("disabled", false);         // 启用
            },'post'
        );
    });

}

module.exports={
    render:render
};