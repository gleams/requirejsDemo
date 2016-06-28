/**
 * Created by jiangh on 2016-06-27.
 */
define(function () {
    var Template = {};
    Template.temp = function (obj,tempHtml) {
        var reg = null;
        for(var o in obj){
            reg = new RegExp('{'+o+'}','g');
            tempHtml =  tempHtml.replace(reg,obj[o]);
        };
        return tempHtml;
    };
    return Template;
});