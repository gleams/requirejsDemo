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
    },
    packages:['assets']

});
//以包文件形式引入，这也会自动从main开始执行。所以不需要手动指定main
require(['assets']);