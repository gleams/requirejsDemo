1. require.js介绍
RequireJS是一个非常小巧的JavaScript模块载入框架，是[AMD](https://github.com/amdjs/amdjs-api/wiki/AMD)规范（另一个规范为[CommonJS](http://www.commonjs.org/)）最好的实现者之一。它还同时可以和其他的框架协同工作，使用RequireJS必将使您的前端代码质量得以提升。
为说明require.js的使用方法，请看下面几个demo ([github地址](https://github.com/gleams/requirejsDemo.git))

1. 使用require.js注意只能有一个入口文件
	- 介绍三种从结果看是一样使用方式。
	- 以下几种本质是一样的，只是使用不太相同罢了。
	- 以下Demo 通过bower来安装jquery插件。
	> bower install jquery

		- 如果没有安装bower 请执行
		> cnpm -g install bower

		- 如果没有cnpm请执行
		> npm install -g cnpm --registry=https://registry.npm.taobao.org

### 模块名的格式

	- 模块名是由一个或多个单词以正斜杠为分隔符拼接成的字符串
	- 单词须为驼峰形式，或者"."，".."
	- 模块名不允许文件扩展名的形式，如".js"
	- 模块名可以为 "相对的" 或 "顶级的"。如果首字符为"."或".."则为"相对的"模块名
	- 顶级的模块名从根命名空间的概念模块解析
	- 相对的模块名从 "require" 书写和调用的模块解析

## demo1 演示require.js基本使用

**demo1-1**只有html部分

```html
	<!DOCTYPE html>
	<html lang="en">
	<head>
	    <meta charset="UTF-8">
	    <title>Title</title>
	</head>
	<body>
	<div id="demo1"></div>
	<script src="../bower_components/requirejs/require.js"></script>
	<script>
	    //本例子中把config文件写在单脚本文件里。

	    /**
	     * require 配置
	     */
	    require.config({
	    paths:{
	        jquery:'../bower_components/jquery/dist/jquery.min'
	    }
	});

	    /**
	     * 使用已经配置好的jquery
	     */
	    require(['jquery'],function($){
	    var $div1 = $('#demo1');
	    $div1.html('hello world!');
	})
	</script>
	</body>
	</html>
```

---

**demo1-2**
js部分(main.js)

```js
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
```

html部分
```html
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>Title</title>
	</head>
	<body>
	<div id="demo1"></div>
	<script src="../bower_components/requirejs/require.js" data-main="main"></script>
	</body>
</html>
```


---
**demo1-3**


js部分(config.js)
```js
	/**
	* Created by jiangh on 2016-06-27.
	*/

	//公共的配置文件
	require.config({
		paths:{
				jquery:'../bower_components/jquery/dist/jquery.min'
		}
	});
```

html部分
```html
	<!DOCTYPE html>
	<html lang="en">
	<head>
	    <meta charset="UTF-8">
	    <title>Title</title>
	</head>
	<body>
	<div id="demo1"></div>
	<script src="../bower_components/requirejs/require.js" data-main="config"></script>
	<script>
	    //这部分代码可能为独立的.js文件
	    //config为配置文件
	    require(['config'],function () {
	        require(['jquery'],function ($) {
	            var $div1 = $('#demo1');
	            $div1.html('hello world!');
	        })
	    });
	</script>
	</body>
	</html>
```

---
以上demo演示了如何使用jquery插件，其它插件的使用方式也是一样的。

## demo2演示如何使用define 完成一个简单的toDo
在使用 require.js既然只有一个入口文件，那应该只有一个require，其它地方是define
**需要了解通过define()来定义的一个模块**
> 使用define时有两个参数最为重要,依赖的其它js插件,和funtion()中参数的关系(一一对应)，
注意返回值

**通过shim配置.js的加载依赖关系**
```js
 shim:{
	 app:{
            deps:['jquery']
        }
 }
 ```

js部分(app.js)
```js
/**
 * Created by jiangh on 2016-06-27.
 * 定义一个追加模块
 */
define(['tool'],function (tool) {
    var $jsInput = $('.jsInput'),
        $jsAdd = $('.jsAdd'),
        $jsList = $('.jsList'),
        items = null,
        num = 0,
        temp = '';

    //简单的模板代码
    temp = '<tr>' +
                '<td><span class="jsNum">{num}</span></td>'+
                '<td>{value}</td>' +
                '<td><input type="button" value="删除"/></td>' +
            '</tr>';

    $jsAdd.on('click',function () {
        if(!$jsInput.val()){
            alert('事项不能这空');
            return;
        }
        items = {
            value:$jsInput.val(),
            num:++num
        };
        $jsList.find('tbody').append(tool.temp(items,temp));
    });

    $jsList.delegate('input','click',function () {
        var $this = $(this);
        $this.closest('tr').remove();
    });

    return $jsAdd;
});
```
js部分(tool.js)
```js
/**
 * Created by jiangh on 2016-06-27.
 *定义一个工具模块
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
```

js部分(main.js)

```js
/**
 * Created by jiangh on 2016-06-27.
 */
require.config({
    paths:{
        jquery:'../bower_components/jquery/dist/jquery.min',
        tool:'assets/tool',
        app:'assets/app'
    },
    shim:{
        app:{
            deps:['jquery']
        }
    }
});

require(['app']);


```

**html部分**
```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>ToDO</title>
</head>
<style>
	* {
			margin:0;
			padding:0;
			font-size: 12px;
	}
	input{
			padding:2px;
	}
	.container{
			width: 960px;
			margin: 50px auto 0;
	}
	.table{
			width: 100%;

	}
	.table thead th{
			background: #ccc;
			padding:3px;
	}
	.table tbody td{
			padding:2px;
	}
	.table tbody tr:nth-child(odd){
			background: #eee;
	}
</style>
<body>
<div class="container">
	<input type="text" class="jsInput" /> <input type="button" value="添加事务" class="jsAdd"/>
	<table class="table jsList">
			<thead>
					<tr>
							<th>#</th>
							<th>事务</th>
							<th>操作</th>
					</tr>
			</thead>
			<tbody>

			</tbody>
	</table>
</div>
<script data-main="main.js" src="../bower_components/requirejs/require.js"></script>
</body>
</html>
```
## demo3演示如何加载一个package
对于包的理解，如果只是开发简单的页面是用不上的，这里的包与java中的package概念差不多，但本质有区别的，es5.1没有包的概念，所以要使用包的概念只能借助别的第三方库/标准了(这里使用requirejs)，不过在es2015中已经有了对包的支持，原生支持模块化/包就不需要第三方了。

还是通过demo分析来看看如何加载一个package
(例子使用demo2中的功能，但这次把这个功能做为一个功能模块。这样如果别的地方要使用该功能模块可以方便提出使用。)
先给出demo3的目录结构
```css
│  index.html
│  main.js
│
└─todo
    │  main.js
    │
    └─app
            app.js
            tool.js

```
这个例子中关键点是：
1. todo作为包
	1. 包结构
	1. 自己文件中引用时路径处理
1. 使用requirejs定义一个包时**packages**的定义
1. 包中使用第三方插件时引入顺序问题


> 先说第一个问题：包结构问题，包的结构按requirejs标准来定义这样可以节省很多配置项目，也会避免很多问题。todo的根目录下面有一个叫main.js的主文件

> 这里的文件路径一定是相对自己去引入其它文件的路径，如果就在同级一定加上./

todo/app/app.js

```js
/**
* Created by jiangh on 2016-06-27.
*/
define(['./tool'],function (tool) {
	var $jsInput = $('.jsInput'),
			$jsAdd = $('.jsAdd'),
			$jsList = $('.jsList'),
			items = null,
			num = 0,
			temp = '';

	//简单的模板代码
	temp = '<tr>' +
							'<td><span class="jsNum">{num}</span></td>'+
							'<td>{value}</td>' +
							'<td><input type="button" value="删除"/></td>' +
					'</tr>';

	$jsAdd.on('click',function () {
			if(!$jsInput.val()){
					alert('事项不能这空');
					return;
			}
			items = {
					value:$jsInput.val(),
					num:++num
			};
			$jsList.find('tbody').append(tool.temp(items,temp));
	});

	$jsList.delegate('input','click',function () {
			var $this = $(this);
			$this.closest('tr').remove();
	});

	return $jsAdd;
});
```

todo/app/tool.js
```js
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
```
todo/main.js
```js
/**
 * Created by jiangh on 2016-06-27.
 */

define(function (require) {   //注意参数require
   var app =  require('./app/app');

    return app;
});

```
/main.js

```js
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
```

index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>ToDO</title>
</head>
<style>
    * {
        margin:0;
        padding:0;
        font-size: 12px;
    }
    input{
        padding:2px;
    }
    .container{
        width: 960px;
        margin: 50px auto 0;
    }
    .table{
        width: 100%;

    }
    .table thead th{
        background: #ccc;
        padding:3px;
    }
    .table tbody td{
        padding:2px;
    }
    .table tbody tr:nth-child(odd){
        background: #eee;
    }
</style>
<body>
<div class="container">
    <input type="text" class="jsInput" /> <input type="button" value="添加事务" class="jsAdd"/>
    <table class="table jsList">
        <thead>
            <tr>
                <th>#</th>
                <th>事务</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>

        </tbody>
    </table>
</div>
<script data-main="main.js" src="../bower_components/requirejs/require.js"></script>
</body>
</html>
```
## demo4 打包文件
对于很多项目，可能会有很多的模块，模块文件比较多，这样会有太多的http请求，不利于优化，另一个原因，源代码直接用于生产环境对于电商等要求静态资源“精益求精”，不是一个好的选择。
> 所以打包源码，压缩源码这样就有市场需求了。

demo4中的todo源码没有变化，变化在打包上面。
目录结构如下：

```css
│  index.html
│  main.js
│
├─build
│      build.amd
│      build.js
│      r.js
│      todo.js
│      todo.min.js
│
└─todo
	│  main.js
	│
	└─app
					app.js
					tool.js
```


1. 使用r.js打包
	1. r.js也是requirejs自己的东东，不过是用来打包模块的，
		> node node r.js -o build.js

		build.js 是一个配置文件，用于配置打包时的相关项目

		```js
				({
			baseUrl: '../todo',
			optimize: 'none',
			name: 'todo',
			packages: [
					{
							name: 'todo',
							location: '.',
							main: 'main'
					}
			],
			out: 'todo.js'
		})
		```

1. 使用uglifyjs压缩代码
	1. 打包只是把多个文件打包到一个文件里面，本身大小没有太大变化，需要经过压缩处理后代码就会有明示的变化。
	>uglifyjs todo.js -m -c -o todo.min.js

1. 引入时就不是引入包了，而是一个插件。

main.js
```js
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
```
