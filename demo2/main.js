/**
 * Created by jiangh on 2016-06-27.
 */
require.config({
    paths:{
        jquery:'../bower_components/jquery/dist/jquery.min',
        tool:'./assets/tool',
        app:'./assets/app'
    },
    shim:{
        app:{
            deps:['jquery']
        }
    }
});

require(['app']);

