/**
 * Created by jiangh on 2016-06-28.
 * 入口文件，配置相关处理。
 */
define(function (require) {
    //初始化
    var init = require('./init');
    var hand = require('./hand');
    init();
    hand.start();
});