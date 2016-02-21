/*var http = require('http');
var express = require('express');
var app = express();

app.use(function(req, res){
	res.writeHead(200, {"Content-Type":"text/html"});
	res.end('<h1>Hello express</h1>');
});

http.createServer(app).listen(1337, function(){
	console.log('Server running ap http://127.0.0.1:1337/');
});*/


var express = require('express');
var path = require('path');
var app = express();

/*app.get('/', function (req, res){
	res.send('Hello World!');
});// url로 get이 오면 응답으로 Hello World!를 보내주라
*/

app.set("view engine", 'ejs');
//express에게 ejs를 view engine으로 사용할 것을 알립니다.
//자동으로 /view 폴더를 검색하고 확장자가 ejs인 파일을 찾는다.

//app.use(express.static(__dirname + '/public'));
//app.use는 미들웨어 사용을 위해 쓰이는 함수
console.log(__dirname);
//__dirname은 node에서 제공하는 node 파일의 경로를 담고 있는 변수
//__가 붙어 있는 변수들은 항상 뭔가 특별한 변수이다.



app.use(express.static(path.join(__dirname, 'public')));
//path는 node에서 제공하는 모듈이다
// __dirname,'/public'을 하던 'public'을 하던 /에 상관없이 주소조합을 알아서 해준다.

app.get('/', function (req, res){
	res.render('my_first_ejs');
});
//'/'route을 생성하고 '/'에 route에 get 신호가 오면 my_first_ejs파일을 render 합니다.

app.listen(8080, function(){
	console.log('Server On!');
});
