/**
 * Created by nayonglin on 17/4/29.
 */


/*GET请求：
 1.新建XHR对象
 2.定义状态监听函数，各种状态对应各种处理
 3.调用open方法启动请求，准备发送
 4.使用send方法发送请求，参数为null

 POST请求：
  1.新建XHR对象
  2.定义状态监听函数，各种状态对应各种处理
  3.使用open方法启动请求，准备发送
  4.设置http头信息的Content-Type类型，模拟表单发送
  5.使用send方法发送请求，参数为自己要发送的东西
 */

    ////get方法测试
    //myAjax({
    //    requestType: 'get',
    //    url: '/getFunc',
    //    async: true,
    //    cache: false,
    //    success: function (data) {
    //        alert(data);
    //    },
    //    error: function (statusText) {
    //        alert("请求失败了，以下是具体信息：\n" + statusText);
    //    }
    //});

    //post方法测试
    //myAjax({
    //    requestType: 'post',
    //    url: '/postFunc',
    //    async: true,
    //    data: {name: "shuai", age: 10},
    //    success: function (data) {
    //        console.log(data);
    //    },
    //    error: function (statusText) {
    //        alert("请求失败了，以下是具体信息：\n" + statusText);
    //    }
    //});

 function myAjax(obj) {
     var xmlHttp;                         //保存xmlHttpRequest对象
     var type = obj.requestType;          //保存请求方式
     var cache = obj.cache || false;      //get时是否使用缓存,默认否
     var success = obj.success;           //数据请求成功的回调方法
     var error = obj.error;               //发生错误的回调方法
     var async = obj.async || false;      //是否异步，默认否
     var data = [];                       //存储用户发来的数据
     var url = obj.url;                   //用户请求地址


     createXmlHttp();   //执行xmlHttp创建函数

     //创建xmlHttp失败
     if(!xmlHttp) {
        console.log("我的老哥，创建xmlHttp对象失败啦！您的浏览器不支持xmlHttpRequest对象");
     }

     try {
         //定义状态监听函数
         xmlHttp.onreadystatechange = function () {
             switch (xmlHttp.readyState) {
                 case 1:
                     console.log("open() 方法已调用，但是 send() 方法未调用。请求还没有被发送。");
                     break;
                 case 2:
                     console.log("Send() 方法已调用，HTTP 请求已发送到 Web 服务器。未接收到响应。");
                     break;
                 case 3:
                     console.log("所有响应头部都已经接收到。响应体开始接收但未完成。");
                     break;
                 case 4:
                     if (xmlHttp.status == 200) {
                         console.log("HTTP 响应已经完全接收。");
                         success(xmlHttp.responseText);                              //调用回调函数
                     }
                     break;
                 default:
                     error(xmlHttp.statusText);
                     break;
             }
         };

         if (type.toUpperCase() == 'GET') {                //如果是get请求
             if (cache == false) {                         //如果get请求不使用缓存
                 xmlHttp.open('get', url + '?random = ' + Math.random(), async);
                 xmlHttp.send('null');
             } else {                                     //如果get请求使用缓存
                 xmlHttp.open('get', url, async);
                 xmlHttp.send('null');
             }
         } else if (type.toUpperCase() == 'POST')          //如果是post请求
         {
             xmlHttp.open('post', url, async);
             xmlHttp.setRequestHeader("Content-Type"
                 , "application/x-www-form-urlencoded");

             //把用户传来的数据转换成字符串
             for (var i in obj.data) {
                 data.push(i + '=' + obj.data[i]);
             }
             data = data.join('&');
             xmlHttp.send(data);
         } else {
            throw  new Error('您的请求方法有误！');
         }
     } catch (error) {
         console.log("出错啦：" + error.message);
     }


    //创建xmlHttpRequest对象函数
    function createXmlHttp() {
        if(window.ActiveXObject) {
            try {
                xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
            }

        } else if (window.XMLHttpRequest){
            try {
                xmlHttp = new XMLHttpRequest();
            } catch(e) {
                xmlHttp = false;
            }
        }
    }

 }
