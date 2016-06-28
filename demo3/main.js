/**
 * Created by jiangh on 2016-06-27.
 */
require.config({
    "packages": ["todo"],
    paths:{
        jquery:'../bower_components/jquery/dist/jquery.min'
    }
});

require(['jquery','todo']);