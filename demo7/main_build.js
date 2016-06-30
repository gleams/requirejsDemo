/**
 * Created by jiangh on 2016-06-28.
 */
require.config({
    paths:{
        assets:'build/assets'
    }
});
//已经打包了，这里需要注意的是打包文件会自动从main.js执行。
require(['assets']);