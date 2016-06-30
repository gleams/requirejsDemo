/**
 * Created by jiangh on 2016-06-28.
 */
require.config({
    // baseUrl:'../bower_components',
   paths:{
        jquery:'../bower_components/jquery/dist/jquery.min',
       bootstrap:'../bower_components/bootstrap/dist/js/bootstrap.min',
       datepicker:'../bower_components/datepicker/js/bootstrap-datepicker',
       select2:'../bower_components/select2/dist/js/select2.min'
   },
    shim:{
        bootstrap:{
            deps:['jquery']
        },
        datepicker:{
            deps:['jquery','bootstrap']
        },
        seletct2:{
            deps:['jquery','bootstrap']
        }
    }

});
//使用常规的定义方式，引入时需要指定入口文件
require(['assets/main']);