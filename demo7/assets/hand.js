/**
 * Created by jiangh on 2016-06-28.
 * 处理业务逻辑
 */
define(['jquery','bootstrap'],function($){
    var  hander = {};

    hander.start = function () {
        var $productname = $('#productname');
        var $form = $('form');
        var $myModal = $('#mySmallModal');


        $form.on('submit',function () {
            if(!$productname.val()){
                $myModal.modal('show')
                       .find('.modal-body')
                       .html('产品名称不能为空！');
                return false;
            }

        })
    }
    return hander;
});