/**
 * Created by jiangh on 2016-06-27.
 */
//一个应该文件本身只能有一个入口文件，这和c一样，也就是只能有一个main函数
//这个例子中没有太多的变化，只是提出一个main.js的入口文件。
require.config({
    paths:{
        jquery:'../bower_components/jquery/dist/jquery.min'
    }
});

require(['jquery'],function ($) {
    var $div1 = $('#demo1');
    $div1.html('hello world!');
});