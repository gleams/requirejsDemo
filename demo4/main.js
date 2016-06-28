/**
 * Created by jiangh on 2016-06-27.
 */
require.config({

    paths:{
        jquery:'../bower_components/jquery/dist/jquery.min',
        todo:'build/todo.min'
    },
    shim:{
        todo:{
            deps:['jquery']
        }
    }
});

require(['todo']);