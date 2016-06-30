/**
 * Created by jiangh on 2016-06-28.
 * 页面初始化
 */
define(['datepicker','select2'],function(){
    return function () {
        $('#dataStart').datepicker();
        $('#select1').select2();
    }
});