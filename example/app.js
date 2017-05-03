/**
 * Created by nayonglin on 17/5/1.
 */

        var express = require('express');
        var app = express();
        var bodyParser = require('body-parser');
        var http = require('http').createServer(app);



        app.use(bodyParser.urlencoded({extended: false}));
        app.use(express.static('public'));

        //请求首页返回index.html
        app.get('/', function (req, res) {
            res.sendFile( __dirname + "/public/xixi.html" );
        });

        //请求首页返回index.html
        app.get('/getFunc', function (req, res) {
                console.log("get方法");
                res.send("我是服务器返回的数据");

        });

        app.post('/postFunc', function (req, res) {
                console.log("post方法");
                console.log(req.body);
                res.send("我是服务器返回的数据");
        });

        //开启http服务器
        var server = http.listen(8080, function () {
            console.log("server start");
        });